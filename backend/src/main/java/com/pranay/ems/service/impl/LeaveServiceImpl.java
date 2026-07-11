package com.pranay.ems.service.impl;

import com.pranay.ems.dto.request.LeaveRequestDto;
import com.pranay.ems.dto.response.LeaveResponse;
import com.pranay.ems.entity.Employee;
import com.pranay.ems.entity.LeaveRequest;
import com.pranay.ems.enums.LeaveStatus;
import com.pranay.ems.exception.DuplicateResourceException;
import com.pranay.ems.exception.ResourceNotFoundException;
import com.pranay.ems.repository.EmployeeRepository;
import com.pranay.ems.repository.LeaveRepository;
import com.pranay.ems.service.LeaveService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveServiceImpl(LeaveRepository leaveRepository,
                            EmployeeRepository employeeRepository) {

        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public LeaveResponse applyLeave(LeaveRequestDto request) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with ID : "
                                        + request.getEmployeeId()));

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new DuplicateResourceException(
                    "End date cannot be before start date.");
        }

        boolean alreadyApplied =
                leaveRepository
                        .existsByEmployeeAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                                employee,
                                request.getEndDate(),
                                request.getStartDate());

        if (alreadyApplied) {
            throw new DuplicateResourceException(
                    "Leave already exists for selected dates.");
        }

        LeaveRequest leave = new LeaveRequest();

        leave.setEmployee(employee);
        leave.setLeaveType(request.getLeaveType());
        leave.setStartDate(request.getStartDate());
        leave.setEndDate(request.getEndDate());
        leave.setReason(request.getReason());
        leave.setStatus(LeaveStatus.PENDING);

        LeaveRequest savedLeave =
                leaveRepository.save(leave);

        return mapToResponse(savedLeave);
    }
    @Override
    public LeaveResponse approveLeave(Long leaveId, String approvedBy) {

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Leave request not found with ID : " + leaveId));

        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new DuplicateResourceException(
                    "Only pending leave requests can be approved.");
        }

        leave.setStatus(LeaveStatus.APPROVED);
        leave.setApprovedBy(approvedBy);
        leave.setApprovedDate(LocalDate.now());

        LeaveRequest updatedLeave = leaveRepository.save(leave);

        return mapToResponse(updatedLeave);
    }

    @Override
    public LeaveResponse rejectLeave(Long leaveId, String approvedBy) {

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Leave request not found with ID : " + leaveId));

        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new DuplicateResourceException(
                    "Only pending leave requests can be rejected.");
        }

        leave.setStatus(LeaveStatus.REJECTED);
        leave.setApprovedBy(approvedBy);
        leave.setApprovedDate(LocalDate.now());

        LeaveRequest updatedLeave = leaveRepository.save(leave);

        return mapToResponse(updatedLeave);
    }

    @Override
    public List<LeaveResponse> getAllLeaves() {

        List<LeaveRequest> leaves = leaveRepository.findAll();

        List<LeaveResponse> responseList = new ArrayList<>();

        for (LeaveRequest leave : leaves) {
            responseList.add(mapToResponse(leave));
        }

        return responseList;
    }

    @Override
    public LeaveResponse getLeaveById(Long id) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Leave request not found with ID : " + id));

        return mapToResponse(leave);
    }
    @Override
    public List<LeaveResponse> getLeavesByEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with ID : " + employeeId));

        List<LeaveRequest> leaves = leaveRepository.findByEmployee(employee);

        List<LeaveResponse> responseList = new ArrayList<>();

        for (LeaveRequest leave : leaves) {
            responseList.add(mapToResponse(leave));
        }

        return responseList;
    }

    @Override
    public List<LeaveResponse> getLeavesByStatus(LeaveStatus status) {

        List<LeaveRequest> leaves = leaveRepository.findByStatus(status);

        List<LeaveResponse> responseList = new ArrayList<>();

        for (LeaveRequest leave : leaves) {
            responseList.add(mapToResponse(leave));
        }

        return responseList;
    }

    private LeaveResponse mapToResponse(LeaveRequest leave) {

        LeaveResponse response = new LeaveResponse();

        response.setId(leave.getId());

        response.setLeaveType(leave.getLeaveType());

        response.setStartDate(leave.getStartDate());

        response.setEndDate(leave.getEndDate());

        response.setReason(leave.getReason());

        response.setStatus(leave.getStatus());

        response.setApprovedBy(leave.getApprovedBy());

        response.setApprovedDate(leave.getApprovedDate());

        Employee employee = leave.getEmployee();

        if (employee != null) {

            response.setEmployeeCode(employee.getEmployeeCode());

            response.setEmployeeName(
                    employee.getFirstName() + " " + employee.getLastName());

            if (employee.getDepartment() != null) {

                response.setDepartmentName(
                        employee.getDepartment().getDepartmentName());
            }
        }

        return response;
    }

}