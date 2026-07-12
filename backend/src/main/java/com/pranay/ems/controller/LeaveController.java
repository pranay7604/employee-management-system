package com.pranay.ems.controller;

import com.pranay.ems.dto.request.LeaveRequestDto;
import com.pranay.ems.dto.response.LeaveResponse;
import com.pranay.ems.enums.LeaveStatus;
import com.pranay.ems.service.LeaveService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR','EMPLOYEE')")
    @PostMapping
    public ResponseEntity<LeaveResponse> applyLeave(
            @Valid @RequestBody LeaveRequestDto request) {

        return new ResponseEntity<>(
                leaveService.applyLeave(request),
                HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @PutMapping("/{leaveId}/approve")
    public ResponseEntity<LeaveResponse> approveLeave(
            @PathVariable Long leaveId,
            @RequestParam String approvedBy) {

        return ResponseEntity.ok(
                leaveService.approveLeave(leaveId, approvedBy));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @PutMapping("/{leaveId}/reject")
    public ResponseEntity<LeaveResponse> rejectLeave(
            @PathVariable Long leaveId,
            @RequestParam String approvedBy) {

        return ResponseEntity.ok(
                leaveService.rejectLeave(leaveId, approvedBy));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping
    public ResponseEntity<List<LeaveResponse>> getAllLeaves() {

        return ResponseEntity.ok(
                leaveService.getAllLeaves());
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/{id}")
    public ResponseEntity<LeaveResponse> getLeaveById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leaveService.getLeaveById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR','EMPLOYEE')")
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveResponse>> getLeavesByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                leaveService.getLeavesByEmployee(employeeId));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/status/{status}")
    public ResponseEntity<List<LeaveResponse>> getLeavesByStatus(
            @PathVariable LeaveStatus status) {

        return ResponseEntity.ok(
                leaveService.getLeavesByStatus(status));
    }
}