package com.pranay.ems.service;

import com.pranay.ems.dto.response.AttendanceResponse;
import com.pranay.ems.dto.response.EmployeeResponse;
import com.pranay.ems.dto.response.LeaveResponse;
import com.pranay.ems.dto.response.PayrollResponse;
import com.pranay.ems.enums.LeaveStatus;

import java.time.LocalDate;
import java.util.List;

public interface ReportService {

    List<EmployeeResponse> getAllEmployees();

    List<EmployeeResponse> getActiveEmployees();

    List<EmployeeResponse> getInactiveEmployees();

    List<AttendanceResponse> getAttendanceByDate(LocalDate date);

    List<AttendanceResponse> getAttendanceByEmployee(Long employeeId);

    List<LeaveResponse> getLeavesByStatus(LeaveStatus status);

    List<LeaveResponse> getLeavesByEmployee(Long employeeId);

    List<PayrollResponse> getPayrollByMonth(Integer month);

    List<PayrollResponse> getPayrollByYear(Integer year);

    List<PayrollResponse> getPayrollByEmployee(Long employeeId);

}