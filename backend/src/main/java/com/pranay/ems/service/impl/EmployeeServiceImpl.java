package com.pranay.ems.service.impl;

import com.pranay.ems.dto.request.EmployeeRequest;
import com.pranay.ems.dto.response.EmployeeResponse;
import com.pranay.ems.entity.Department;
import com.pranay.ems.entity.Employee;
import com.pranay.ems.entity.User;
import com.pranay.ems.enums.EmployeeStatus;
import com.pranay.ems.exception.DuplicateResourceException;
import com.pranay.ems.exception.ResourceNotFoundException;
import com.pranay.ems.repository.DepartmentRepository;
import com.pranay.ems.repository.EmployeeRepository;
import com.pranay.ems.repository.UserRepository;
import com.pranay.ems.service.EmployeeService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                               UserRepository userRepository,
                               DepartmentRepository departmentRepository) {

        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public EmployeeResponse addEmployee(EmployeeRequest request) {

        if (employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            throw new DuplicateResourceException("Employee code already exists.");
        }

        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Employee email already exists.");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID : " + request.getUserId()));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with ID : " + request.getDepartmentId()));

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

        employee.setUser(user);
        employee.setDepartment(department);

        Employee savedEmployee = employeeRepository.save(employee);

        return mapToEmployeeResponse(savedEmployee);
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();

        List<EmployeeResponse> responseList = new ArrayList<>();

        for (Employee employee : employees) {
            responseList.add(mapToEmployeeResponse(employee));
        }

        return responseList;
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with ID : " + id));

        return mapToEmployeeResponse(employee);
    }
    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with ID : " + id));

        if (!employee.getEmployeeCode().equals(request.getEmployeeCode())
                && employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {

            throw new DuplicateResourceException("Employee code already exists.");
        }

        if (!employee.getEmail().equals(request.getEmail())
                && employeeRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException("Employee email already exists.");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID : " + request.getUserId()));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with ID : " + request.getDepartmentId()));

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
        employee.setDepartment(department);

        Employee updatedEmployee = employeeRepository.save(employee);

        return mapToEmployeeResponse(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with ID : " + id));

        employeeRepository.delete(employee);
    }

    @Override
    public List<EmployeeResponse> searchEmployees(String keyword) {

        List<Employee> employees =
                employeeRepository
                        .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmployeeCodeContainingIgnoreCaseOrEmailContainingIgnoreCase(
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

        if (employee.getDepartment() != null) {
            response.setDepartmentName(
                    employee.getDepartment().getDepartmentName());
        }

        return response;
    }
}