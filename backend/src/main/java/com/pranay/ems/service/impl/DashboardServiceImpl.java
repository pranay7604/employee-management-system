package com.pranay.ems.service.impl;

import com.pranay.ems.dto.response.DashboardResponse;
import com.pranay.ems.enums.AttendanceStatus;
import com.pranay.ems.enums.EmployeeStatus;
import com.pranay.ems.enums.LeaveStatus;
import com.pranay.ems.repository.AttendanceRepository;
import com.pranay.ems.repository.DepartmentRepository;
import com.pranay.ems.repository.EmployeeRepository;
import com.pranay.ems.repository.LeaveRepository;
import com.pranay.ems.repository.PayrollRepository;
import com.pranay.ems.service.DashboardService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;
    private final PayrollRepository payrollRepository;

    public DashboardServiceImpl(EmployeeRepository employeeRepository,
                                DepartmentRepository departmentRepository,
                                AttendanceRepository attendanceRepository,
                                LeaveRepository leaveRepository,
                                PayrollRepository payrollRepository) {

        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.attendanceRepository = attendanceRepository;
        this.leaveRepository = leaveRepository;
        this.payrollRepository = payrollRepository;
    }

    @Override
    public DashboardResponse getDashboardSummary() {

        DashboardResponse response = new DashboardResponse();


        // Employees
        response.setTotalEmployees(employeeRepository.count());

        response.setActiveEmployees(
                employeeRepository.countByStatus(EmployeeStatus.ACTIVE));

        response.setInactiveEmployees(
                employeeRepository.countByStatus(EmployeeStatus.INACTIVE));

        // Departments
        response.setTotalDepartments(
                departmentRepository.count());

        // Attendance
        response.setTodayAttendance(
                attendanceRepository.countByAttendanceDate(LocalDate.now()));

        response.setPresentEmployees(
                attendanceRepository.countByAttendanceDateAndAttendanceStatus(
                        LocalDate.now(),
                        AttendanceStatus.PRESENT));

        response.setAbsentEmployees(
                attendanceRepository.countByAttendanceDateAndAttendanceStatus(
                        LocalDate.now(),
                        AttendanceStatus.ABSENT));

        // Leaves
        response.setPendingLeaves(
                leaveRepository.countByStatus(LeaveStatus.PENDING));

        response.setApprovedLeaves(
                leaveRepository.countByStatus(LeaveStatus.APPROVED));

        response.setRejectedLeaves(
                leaveRepository.countByStatus(LeaveStatus.REJECTED));

        // Payroll
        response.setTotalPayrollGenerated(
                payrollRepository.count());

        response.setMonthlySalaryExpense(
                payrollRepository.getMonthlySalaryExpense(
                        LocalDate.now().getMonthValue(),
                        LocalDate.now().getYear()));

        return response;
    }
}
