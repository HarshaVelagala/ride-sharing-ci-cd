package com.rideshare.service;

import com.rideshare.config.JwtUtil;
import com.rideshare.dto.AuthRequest;
import com.rideshare.dto.AuthResponse;
import com.rideshare.model.User;
import com.rideshare.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> createDemoUser(request));
        String token = jwtUtil.createToken(user.getEmail(), Map.of("displayName", user.getDisplayName()));
        return new AuthResponse(token, user.getDisplayName());
    }

    private User createDemoUser(AuthRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setDisplayName("Demo Rider");
        return userRepository.save(user);
    }
}
