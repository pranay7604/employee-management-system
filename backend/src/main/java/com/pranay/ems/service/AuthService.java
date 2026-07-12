package com.pranay.ems.service;

import com.pranay.ems.dto.request.LoginRequest;
import com.pranay.ems.dto.request.RegisterRequest;
import com.pranay.ems.dto.response.LoginResponse;

public interface AuthService {

    String register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}