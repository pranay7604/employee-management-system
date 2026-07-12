package com.pranay.ems.controller;

import com.pranay.ems.dto.response.AttendanceResponse;
import com.pranay.ems.dto.response.EmployeeResponse;
import com.pranay.ems.dto.response.LeaveResponse;
import com.pranay.ems.dto.response.PayrollResponse;
import com.pranay.ems.enums.LeaveStatus;
import com.pranay.ems.service.ReportService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // ================= Employee Reports =================

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        return ResponseEntity.ok(reportService.getAllEmployees());
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/employees/active")
    public ResponseEntity<List<EmployeeResponse>> getActiveEmployees() {
        return ResponseEntity.ok(reportService.getActiveEmployees());
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/employees/inactive")
    public ResponseEntity<List<EmployeeResponse>> getInactiveEmployees() {
        return ResponseEntity.ok(reportService.getInactiveEmployees());
    }

    // ================= Attendance Reports =================

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/attendance/date/{date}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByDate(
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return ResponseEntity.ok(
                reportService.getAttendanceByDate(date));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/attendance/employee/{employeeId}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                reportService.getAttendanceByEmployee(employeeId));
    }

    // ================= Leave Reports =================

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/leaves/status/{status}")
    public ResponseEntity<List<LeaveResponse>> getLeavesByStatus(
            @PathVariable LeaveStatus status) {

        return ResponseEntity.ok(
                reportService.getLeavesByStatus(status));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/leaves/employee/{employeeId}")
    public ResponseEntity<List<LeaveResponse>> getLeavesByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                reportService.getLeavesByEmployee(employeeId));
    }

    // ================= Payroll Reports =================

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/payroll/month/{month}")
    public ResponseEntity<List<PayrollResponse>> getPayrollByMonth(
            @PathVariable Integer month) {

        return ResponseEntity.ok(
                reportService.getPayrollByMonth(month));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/payroll/year/{year}")
    public ResponseEntity<List<PayrollResponse>> getPayrollByYear(
            @PathVariable Integer year) {

        return ResponseEntity.ok(
                reportService.getPayrollByYear(year));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/payroll/employee/{employeeId}")
    public ResponseEntity<List<PayrollResponse>> getPayrollByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                reportService.getPayrollByEmployee(employeeId));
    }
}