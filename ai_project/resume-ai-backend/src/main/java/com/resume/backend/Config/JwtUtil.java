package com.resume.backend.Config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "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";

    private static final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // ✅ Extract email from token
    public static String getEmailFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject(); // usually contains the email or username
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }

    // ✅ Validate token (optional)
    public static boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // ✅ Generate token (optional)
    public static String generateToken(String email) {
        long expirationMillis = 1000 * 60 * 60 * 24; // 24 hours

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(key)
                .compact();
    }
}

