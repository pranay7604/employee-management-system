package com.pranay.ems.service.impl;

import com.pranay.ems.dto.response.UserResponse;
import com.pranay.ems.entity.User;
import com.pranay.ems.exception.ResourceNotFoundException;
import com.pranay.ems.repository.UserRepository;
import com.pranay.ems.service.UserService;
import org.springframework.stereotype.Service;
import com.pranay.ems.entity.Employee;
import com.pranay.ems.repository.EmployeeRepository;
import java.util.Set;
import java.util.stream.Collectors;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;

    public UserServiceImpl(UserRepository userRepository,
                           EmployeeRepository employeeRepository) {

        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<UserResponse> getAllUsers() {

        List<User> users = userRepository.findAll();

        List<UserResponse> responseList = new ArrayList<>();

        for (User user : users) {
            responseList.add(mapToResponse(user));
        }

        return responseList;
    }

    @Override
    public UserResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID : " + id));

        return mapToResponse(user);
    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID : " + id));

        userRepository.delete(user);
    }
    @Override
    public List<UserResponse> getAvailableUsers() {

        List<User> users = userRepository.findAll();

        Set<Long> assignedUserIds = employeeRepository.findByUserIsNotNull()
                .stream()
                .map(employee -> employee.getUser().getId())
                .collect(Collectors.toSet());

        List<UserResponse> availableUsers = new ArrayList<>();

        for (User user : users) {

            if (!assignedUserIds.contains(user.getId())) {
                availableUsers.add(mapToResponse(user));
            }
        }

        return availableUsers;
    }
    private UserResponse mapToResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().getName())
                .build();
    }
}