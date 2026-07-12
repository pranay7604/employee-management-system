package com.pranay.ems.service.impl;

import com.pranay.ems.dto.response.AttendanceResponse;
import com.pranay.ems.dto.response.EmployeeResponse;
import com.pranay.ems.dto.response.LeaveResponse;
import com.pranay.ems.dto.response.PayrollResponse;
import com.pranay.ems.enums.EmployeeStatus;
import com.pranay.ems.enums.LeaveStatus;
import com.pranay.ems.service.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final EmployeeService employeeService;
    private final AttendanceService attendanceService;
    private final LeaveService leaveService;
    private final PayrollService payrollService;

    public ReportServiceImpl(EmployeeService employeeService,
                             AttendanceService attendanceService,
                             LeaveService leaveService,
                             PayrollService payrollService) {

        this.employeeService = employeeService;
        this.attendanceService = attendanceService;
        this.leaveService = leaveService;
        this.payrollService = payrollService;
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @Override
    public List<EmployeeResponse> getActiveEmployees() {
        return employeeService.getEmployeesByStatus(EmployeeStatus.ACTIVE);
    }

    @Override
    public List<EmployeeResponse> getInactiveEmployees() {
        return employeeService.getEmployeesByStatus(EmployeeStatus.INACTIVE);
    }

    @Override
    public List<AttendanceResponse> getAttendanceByDate(LocalDate date) {
        return attendanceService.getAttendanceByDate(date);
    }

    @Override
    public List<AttendanceResponse> getAttendanceByEmployee(Long employeeId) {
        return attendanceService.getAttendanceByEmployee(employeeId);
    }

    @Override
    public List<LeaveResponse> getLeavesByStatus(LeaveStatus status) {
        return leaveService.getLeavesByStatus(status);
    }

    @Override
    public List<LeaveResponse> getLeavesByEmployee(Long employeeId) {
        return leaveService.getLeavesByEmployee(employeeId);
    }

    @Override
    public List<PayrollResponse> getPayrollByMonth(Integer month) {
        return payrollService.getPayrollByMonth(month);
    }

    @Override
    public List<PayrollResponse> getPayrollByYear(Integer year) {
        return payrollService.getPayrollByYear(year);
    }

    @Override
    public List<PayrollResponse> getPayrollByEmployee(Long employeeId) {
        return payrollService.getPayrollByEmployee(employeeId);
    }
}