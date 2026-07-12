package com.pranay.ems.service;

import com.pranay.ems.dto.request.PayrollRequest;
import com.pranay.ems.dto.response.PayrollResponse;

import java.util.List;

public interface PayrollService {

    PayrollResponse generatePayroll(PayrollRequest request);

    PayrollResponse getPayrollById(Long id);

    List<PayrollResponse> getAllPayrolls();

    List<PayrollResponse> getPayrollByEmployee(Long employeeId);

    List<PayrollResponse> getPayrollByMonth(Integer month);

    List<PayrollResponse> getPayrollByYear(Integer year);

    List<PayrollResponse> getPayrollByMonthAndYear(
            Integer month,
            Integer year);

    void deletePayroll(Long id);
}