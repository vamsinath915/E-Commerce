package com.AI_Powered_E_Commerce.service;

import com.AI_Powered_E_Commerce.entity.User;
import com.AI_Powered_E_Commerce.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISTER
    public User register(User user) {

        // Check whether email already exists
        if (userRepository
                .findByEmail(user.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        // Encrypt password before saving
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // LOGIN
    public User login(
            String email,
            String password) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Invalid email or password"
                        )
                );

        // Compare entered password with encrypted password
        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        return user;
    }
}