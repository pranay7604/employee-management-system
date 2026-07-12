package com.pranay.ems.controller;

import com.pranay.ems.dto.request.LoginRequest;
import com.pranay.ems.dto.request.RegisterRequest;
import com.pranay.ems.dto.response.LoginResponse;
import com.pranay.ems.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        System.out.println("===== LOGIN API HIT =====");

        return authService.login(request);
    }

    @PostMapping("/encode")
    public String encode(@RequestParam String password) {
        return new BCryptPasswordEncoder().encode(password);
    }
}