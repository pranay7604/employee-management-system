package com.pranay.ems.service;

import com.pranay.ems.dto.request.DepartmentRequest;
import com.pranay.ems.dto.response.DepartmentResponse;

import java.util.List;

public interface DepartmentService {

    DepartmentResponse addDepartment(DepartmentRequest request);

    List<DepartmentResponse> getAllDepartments();

    DepartmentResponse getDepartmentById(Long id);

    DepartmentResponse updateDepartment(Long id, DepartmentRequest request);

    void deleteDepartment(Long id);

    List<DepartmentResponse> searchDepartment(String keyword);

}