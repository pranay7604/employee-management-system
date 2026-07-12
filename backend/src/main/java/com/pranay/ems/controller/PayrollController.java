package com.pranay.ems.controller;

import com.pranay.ems.dto.request.PayrollRequest;
import com.pranay.ems.dto.response.PayrollResponse;
import com.pranay.ems.service.PayrollService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payroll")
public class PayrollController {

    private final PayrollService payrollService;

    public PayrollController(PayrollService payrollService) {
        this.payrollService = payrollService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @PostMapping
    public ResponseEntity<PayrollResponse> generatePayroll(
            @Valid @RequestBody PayrollRequest request) {

        return new ResponseEntity<>(
                payrollService.generatePayroll(request),
                HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping
    public ResponseEntity<List<PayrollResponse>> getAllPayrolls() {

        return ResponseEntity.ok(
                payrollService.getAllPayrolls());
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/{id}")
    public ResponseEntity<PayrollResponse> getPayrollById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                payrollService.getPayrollById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<PayrollResponse>> getPayrollByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                payrollService.getPayrollByEmployee(employeeId));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/month/{month}")
    public ResponseEntity<List<PayrollResponse>> getPayrollByMonth(
            @PathVariable Integer month) {

        return ResponseEntity.ok(
                payrollService.getPayrollByMonth(month));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/year/{year}")
    public ResponseEntity<List<PayrollResponse>> getPayrollByYear(
            @PathVariable Integer year) {

        return ResponseEntity.ok(
                payrollService.getPayrollByYear(year));
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/{month}/{year}")
    public ResponseEntity<List<PayrollResponse>> getPayrollByMonthAndYear(
            @PathVariable Integer month,
            @PathVariable Integer year) {

        return ResponseEntity.ok(
                payrollService.getPayrollByMonthAndYear(month, year));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayroll(
            @PathVariable Long id) {

        payrollService.deletePayroll(id);

        return ResponseEntity.ok("Payroll deleted successfully.");
    }
}