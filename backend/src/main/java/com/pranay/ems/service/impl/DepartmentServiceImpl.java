package com.pranay.ems.service.impl;

import com.pranay.ems.dto.request.DepartmentRequest;
import com.pranay.ems.dto.response.DepartmentResponse;
import com.pranay.ems.entity.Department;
import com.pranay.ems.exception.DuplicateResourceException;
import com.pranay.ems.exception.ResourceNotFoundException;
import com.pranay.ems.repository.DepartmentRepository;
import com.pranay.ems.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public DepartmentResponse addDepartment(DepartmentRequest request) {

        if (departmentRepository.existsByDepartmentCode(request.getDepartmentCode())) {
            throw new DuplicateResourceException("Department code already exists.");
        }

        if (departmentRepository.existsByDepartmentName(request.getDepartmentName())) {
            throw new DuplicateResourceException("Department name already exists.");
        }

        Department department = new Department();

        department.setDepartmentCode(request.getDepartmentCode());
        department.setDepartmentName(request.getDepartmentName());
        department.setDescription(request.getDescription());
        department.setLocation(request.getLocation());

        Department savedDepartment = departmentRepository.save(department);

        return mapToResponse(savedDepartment);
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {

        List<Department> departments = departmentRepository.findAll();

        List<DepartmentResponse> responseList = new ArrayList<>();

        for (Department department : departments) {
            responseList.add(mapToResponse(department));
        }

        return responseList;
    }

    @Override
    public DepartmentResponse getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with ID : " + id));

        return mapToResponse(department);
    }

    @Override
    public DepartmentResponse updateDepartment(Long id, DepartmentRequest request) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with ID : " + id));

        if (!department.getDepartmentCode().equals(request.getDepartmentCode())
                && departmentRepository.existsByDepartmentCode(request.getDepartmentCode())) {

            throw new DuplicateResourceException("Department code already exists.");
        }

        if (!department.getDepartmentName().equals(request.getDepartmentName())
                && departmentRepository.existsByDepartmentName(request.getDepartmentName())) {

            throw new DuplicateResourceException("Department name already exists.");
        }

        department.setDepartmentCode(request.getDepartmentCode());
        department.setDepartmentName(request.getDepartmentName());
        department.setDescription(request.getDescription());
        department.setLocation(request.getLocation());

        Department updatedDepartment = departmentRepository.save(department);

        return mapToResponse(updatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with ID : " + id));

        departmentRepository.delete(department);
    }

    @Override
    public List<DepartmentResponse> searchDepartment(String keyword) {

        List<Department> departments =
                departmentRepository.findByDepartmentNameContainingIgnoreCase(keyword);

        List<DepartmentResponse> responseList = new ArrayList<>();

        for (Department department : departments) {
            responseList.add(mapToResponse(department));
        }

        return responseList;
    }

    private DepartmentResponse mapToResponse(Department department) {

        DepartmentResponse response = new DepartmentResponse();

        response.setId(department.getId());
        response.setDepartmentCode(department.getDepartmentCode());
        response.setDepartmentName(department.getDepartmentName());
        response.setDescription(department.getDescription());
        response.setLocation(department.getLocation());
        response.setActive(department.getActive());

        return response;
    }

}