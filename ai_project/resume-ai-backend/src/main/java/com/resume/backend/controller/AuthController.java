package com.resume.backend.controller;

import com.resume.backend.Config.JwtUtil;
import com.resume.backend.dto.LoginRequest;
import com.resume.backend.model.User;
import com.resume.backend.model.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil; // Assuming JwtUtil is injectable

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Missing or invalid Authorization header"));
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromToken(token);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid token"));
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
        }

        User user = userOpt.get();
        // --- MODIFICATION START ---
        // Add the user's email to the response map.
        Map<String, Object> userProfile = Map.of(
                "name", user.getName(),
                "picture", user.getPictureUrl(),
                "email", user.getEmail() // Add this line
        );
        // --- MODIFICATION END ---

        return ResponseEntity.ok(userProfile);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody LoginRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email already in use"));
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setProvider("local");

        // **Modification: Extract and set the name from the email address**
        String email = request.getEmail();
        if (email != null && email.contains("@")) {
            // Extracts the part of the email before the "@" symbol
            String name = email.split("@")[0];
            user.setName(name);
        }

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent() && passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            String token = jwtUtil.generateToken(userOpt.get().getEmail());
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/oauth2/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        String idToken = body.get("token");

        String url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + idToken;
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> googleUser = restTemplate.getForObject(url, Map.class);

        if (googleUser == null || googleUser.get("email") == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid Google token"));
        }

        String email = googleUser.get("email");
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setProvider("google");
            newUser.setName(googleUser.get("name"));
            newUser.setPictureUrl(googleUser.get("picture"));
            return userRepository.save(newUser);
        });

        // Generate a JWT for the user
        String token = jwtUtil.generateToken(user.getEmail());

        // Return the token in the response
        return ResponseEntity.ok(Map.of("token", token));
    }
}