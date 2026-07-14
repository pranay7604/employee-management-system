package com.pranay.ems.service;

import com.pranay.ems.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    void deleteUser(Long id);

    List<UserResponse> getAvailableUsers();
}