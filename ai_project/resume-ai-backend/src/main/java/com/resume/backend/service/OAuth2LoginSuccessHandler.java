package com.resume.backend.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    // You will need a way to generate a JWT token
    // For simplicity, we are passing the user's name, but you should implement JWT
    // private final JwtTokenProvider tokenProvider;

    // public OAuth2LoginSuccessHandler(JwtTokenProvider tokenProvider) {
    //     this.tokenProvider = tokenProvider;
    // }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        // Create a JWT token
        // String token = tokenProvider.createToken(email);

        // For now, let's just pass the user's name as a placeholder token
        String token = oAuth2User.getAttribute("name");


        String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/generate-resume")
                .queryParam("token", token)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}