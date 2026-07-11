package com.pranay.ems.service;

import com.pranay.ems.dto.request.EmployeeRequest;
import com.pranay.ems.dto.response.EmployeeResponse;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse addEmployee(EmployeeRequest request);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);

    void deleteEmployee(Long id);
}