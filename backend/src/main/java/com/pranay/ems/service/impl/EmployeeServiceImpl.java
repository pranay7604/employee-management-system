package com.pranay.ems.service.impl;

import com.pranay.ems.dto.request.EmployeeRequest;
import com.pranay.ems.dto.response.EmployeeResponse;
import com.pranay.ems.entity.User;
import com.pranay.ems.enums.EmployeeStatus;
import com.pranay.ems.exception.DuplicateResourceException;
import com.pranay.ems.exception.ResourceNotFoundException;
import com.pranay.ems.repository.EmployeeRepository;
import com.pranay.ems.repository.UserRepository;
import com.pranay.ems.service.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import com.pranay.ems.entity.Employee;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
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

        // Fetch user by ID
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID: " + request.getUserId()));

        // Create Employee Entity
        Employee employee = new Employee();

        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setGender(request.getGender());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setAddress(request.getAddress());
        employee.setStatus(request.getStatus());

        // Link User
        employee.setUser(user);

        // Save Employee
        Employee savedEmployee = employeeRepository.save(employee);

        // Prepare Response
        EmployeeResponse response = new EmployeeResponse();

        response.setId(savedEmployee.getId());
        response.setEmployeeCode(savedEmployee.getEmployeeCode());
        response.setFullName(savedEmployee.getFirstName() + " " + savedEmployee.getLastName());
        response.setEmail(savedEmployee.getEmail());
        response.setDesignation(savedEmployee.getDesignation());
        response.setStatus(savedEmployee.getStatus());

        return response;
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();

        List<EmployeeResponse> responseList = new ArrayList<>();

        for (Employee employee : employees) {

            EmployeeResponse response = new EmployeeResponse();

            response.setId(employee.getId());
            response.setEmployeeCode(employee.getEmployeeCode());
            response.setFullName(employee.getFirstName() + " " + employee.getLastName());
            response.setEmail(employee.getEmail());
            response.setDesignation(employee.getDesignation());
            response.setStatus(employee.getStatus());

            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with ID: " + id));

        EmployeeResponse response = new EmployeeResponse();

        response.setId(employee.getId());
        response.setEmployeeCode(employee.getEmployeeCode());
        response.setFullName(employee.getFirstName() + " " + employee.getLastName());
        response.setEmail(employee.getEmail());
        response.setDesignation(employee.getDesignation());
        response.setStatus(employee.getStatus());

        return response;
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with ID: " + id));

        // Check employee code if changed
        if (!employee.getEmployeeCode().equals(request.getEmployeeCode())
                && employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {

            throw new DuplicateResourceException("Employee code already exists.");
        }

        // Check email if changed
        if (!employee.getEmail().equals(request.getEmail())
                && employeeRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException("Email already exists.");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setGender(request.getGender());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setAddress(request.getAddress());
        employee.setStatus(request.getStatus());
        employee.setUser(user);

        Employee updatedEmployee = employeeRepository.save(employee);

        EmployeeResponse response = new EmployeeResponse();

        response.setId(updatedEmployee.getId());
        response.setEmployeeCode(updatedEmployee.getEmployeeCode());
        response.setFullName(updatedEmployee.getFirstName() + " " + updatedEmployee.getLastName());
        response.setEmail(updatedEmployee.getEmail());
        response.setDesignation(updatedEmployee.getDesignation());
        response.setStatus(updatedEmployee.getStatus());

        return response;
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with ID: " + id));

        employeeRepository.delete(employee);
    }

    @Override
    public List<EmployeeResponse> searchEmployees(String keyword) {

        List<Employee> employees =
                employeeRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmployeeCodeContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword,
                        keyword
                );

        List<EmployeeResponse> responseList = new ArrayList<>();

        for (Employee employee : employees) {
            responseList.add(mapToEmployeeResponse(employee));
        }

        return responseList;
    }

    @Override
    public Page<EmployeeResponse> getEmployees(int page,
                                               int size,
                                               String sortBy,
                                               String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Employee> employeePage = employeeRepository.findAll(pageable);

        return employeePage.map(this::mapToEmployeeResponse);
    }
    @Override
    public List<EmployeeResponse> getEmployeesByStatus(EmployeeStatus status) {

        List<Employee> employees = employeeRepository.findByStatus(status);

        List<EmployeeResponse> responseList = new ArrayList<>();

        for (Employee employee : employees) {
            responseList.add(mapToEmployeeResponse(employee));
        }

        return responseList;
    }


    @Override
    public List<EmployeeResponse> getEmployeesByDesignation(String designation) {

        List<Employee> employees =
                employeeRepository.findByDesignationContainingIgnoreCase(designation);

        List<EmployeeResponse> responseList = new ArrayList<>();

        for (Employee employee : employees) {
            responseList.add(mapToEmployeeResponse(employee));
        }

        return responseList;
    }
    private EmployeeResponse mapToEmployeeResponse(Employee employee) {

        EmployeeResponse response = new EmployeeResponse();

        response.setId(employee.getId());
        response.setEmployeeCode(employee.getEmployeeCode());
        response.setFullName(employee.getFirstName() + " " + employee.getLastName());
        response.setEmail(employee.getEmail());
        response.setDesignation(employee.getDesignation());
        response.setStatus(employee.getStatus());

        return response;
    }
}