package com.pranay.ems.service.impl;

import com.pranay.ems.dto.request.EmployeeRequest;
import com.pranay.ems.dto.response.EmployeeResponse;
import com.pranay.ems.exception.DuplicateResourceException;
import com.pranay.ems.repository.EmployeeRepository;
import com.pranay.ems.repository.UserRepository;
import com.pranay.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                               UserRepository userRepository) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public EmployeeResponse addEmployee(EmployeeRequest request) {

        // Check if employee code already exists
        if (employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            throw new DuplicateResourceException("Employee code already exists.");
        }

        // Check if email already exists
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        // Remaining implementation will be added in the next step
        return null;
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {
        return List.of();
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {
        return null;
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        return null;
    }

    @Override
    public void deleteEmployee(Long id) {

    }
}