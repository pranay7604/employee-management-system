package com.pranay.ems.service;

import com.pranay.ems.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

}