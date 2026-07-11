package com.pranay.ems.service;

import com.pranay.ems.dto.request.EmployeeRequest;
import com.pranay.ems.dto.response.EmployeeResponse;
import com.pranay.ems.enums.EmployeeStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse addEmployee(EmployeeRequest request);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);

    void deleteEmployee(Long id);

    List<EmployeeResponse> searchEmployees(String keyword);
    Page<EmployeeResponse> getEmployees(
            int page,
            int size,
            String sortBy,
            String direction
    );
    List<EmployeeResponse> getEmployeesByStatus(EmployeeStatus status);
    List<EmployeeResponse> getEmployeesByDesignation(String designation);
}