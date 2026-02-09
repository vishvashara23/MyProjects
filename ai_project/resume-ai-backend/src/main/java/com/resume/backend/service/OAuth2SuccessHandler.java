//package com.resume.backend.service;
//
//import com.resume.backend.model.User;
//import com.resume.backend.model.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/auth")
//
//public class OAuth2SuccessHandler {
//
//    public OAuth2SuccessHandler(UserRepository userRepository)
//    {
//        this.userRepository = userRepository;
//    }
//
//    private final UserRepository userRepository;
//
//    @GetMapping("/oauth2/success")
//    public String oauth2Success(@AuthenticationPrincipal OAuth2User principal) {
//        String email = principal.getAttribute("email");
//        String name = principal.getAttribute("name");
//        String picture = principal.getAttribute("picture");
//
//        userRepository.findByEmail(email).orElseGet(() -> {
//            User user = new User();
//            user.setEmail(email);
//            user.setProvider("google");
//            user.setName(name);
//            user.setPictureUrl(picture);
//            return userRepository.save(user);
//        });
//
//        return "Logged in via Google: " + email;
//    }
//}
