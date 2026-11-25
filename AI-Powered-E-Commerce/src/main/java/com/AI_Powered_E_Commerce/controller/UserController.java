package com.AI_Powered_E_Commerce.controller;



import com.AI_Powered_E_Commerce.entity.User;
import com.AI_Powered_E_Commerce.service.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService) {

        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(
            @RequestBody User user) {

        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(
            @RequestBody User user) {

        return userService.login(
                user.getEmail(),
                user.getPassword()
        );
    }
}
