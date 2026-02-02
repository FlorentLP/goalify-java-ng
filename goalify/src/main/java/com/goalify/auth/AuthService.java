package com.goalify.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.goalify.auth.dto.AuthResponseDto;
import com.goalify.auth.dto.LoginRequestDto;
import com.goalify.auth.dto.RegisterRequestDto;
import com.goalify.user.User;
import com.goalify.user.UserRepository;


@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtService;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtUtil jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponseDto register(RegisterRequestDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Email already in use");
        }

        User user = new User(
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            request.getName()
        );

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthResponseDto(user, token);
    }

    public AuthResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found"));

        if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword()))
            throw new IllegalArgumentException("Invalid credentials");

        String token = jwtService.generateToken(user);

        return new AuthResponseDto(user, token);
    }
}