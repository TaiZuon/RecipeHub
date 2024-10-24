package com.recipehub.auth_service.controller;

import com.recipehub.auth_service.dto.request.UserCreationRequest;
import com.recipehub.auth_service.entity.User;
import com.recipehub.auth_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    User createUser(@RequestBody UserCreationRequest request) {
        return userService.createUser(request);
    }

    @PostMapping("/users/{id}")
    Optional<User> findUserById(@PathVariable("id") String id) {
        return userService.findUserById(id);
    }

    @GetMapping("/users/{username}")
    Optional<User> findUserByUsername(@PathVariable("username") String username) {
        return userService.findUserByUsername(username);
    }
}
