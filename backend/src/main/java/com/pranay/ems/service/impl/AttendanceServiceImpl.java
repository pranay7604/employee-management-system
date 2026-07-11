package com.pranay.ems.service.impl;

import com.pranay.ems.dto.request.AttendanceRequest;
import com.pranay.ems.dto.response.AttendanceResponse;
import com.pranay.ems.entity.Attendance;
import com.pranay.ems.entity.Employee;
import com.pranay.ems.enums.AttendanceStatus;
import com.pranay.ems.exception.DuplicateResourceException;
import com.pranay.ems.exception.ResourceNotFoundException;
import com.pranay.ems.repository.AttendanceRepository;
import com.pranay.ems.repository.EmployeeRepository;
import com.pranay.ems.service.AttendanceService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository,
                                 EmployeeRepository employeeRepository) {

        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public AttendanceResponse checkIn(AttendanceRequest request) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with ID : "
                                        + request.getEmployeeId()));

        attendanceRepository
                .findByEmployeeAndAttendanceDate(employee, LocalDate.now())
                .ifPresent(attendance -> {
                    throw new DuplicateResourceException(
                            "Employee has already checked in today.");
                });

        Attendance attendance = new Attendance();

        attendance.setEmployee(employee);
        attendance.setAttendanceDate(LocalDate.now());
        attendance.setCheckIn(LocalDateTime.now());
        attendance.setAttendanceStatus(AttendanceStatus.PRESENT);
        attendance.setRemarks(request.getRemarks());

        Attendance savedAttendance =
                attendanceRepository.save(attendance);

        return mapToResponse(savedAttendance);
    }
    @Override
    public AttendanceResponse checkOut(Long attendanceId) {

        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Attendance not found with ID : "
                                        + attendanceId));

        if (attendance.getCheckOut() != null) {
            throw new DuplicateResourceException(
                    "Employee has already checked out.");
        }

        attendance.setCheckOut(LocalDateTime.now());

        Attendance updatedAttendance =
                attendanceRepository.save(attendance);

        return mapToResponse(updatedAttendance);
    }

    @Override
    public List<AttendanceResponse> getAllAttendance() {

        List<Attendance> attendanceList =
                attendanceRepository.findAll();

        List<AttendanceResponse> responseList =
                new ArrayList<>();

        for (Attendance attendance : attendanceList) {
            responseList.add(mapToResponse(attendance));
        }

        return responseList;
    }

    @Override
    public AttendanceResponse getAttendanceById(Long id) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Attendance not found with ID : " + id));

        return mapToResponse(attendance);
    }

    @Override
    public List<AttendanceResponse> getAttendanceByEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with ID : "
                                        + employeeId));

        List<Attendance> attendanceList =
                attendanceRepository.findByEmployee(employee);

        List<AttendanceResponse> responseList =
                new ArrayList<>();

        for (Attendance attendance : attendanceList) {
            responseList.add(mapToResponse(attendance));
        }

        return responseList;
    }

    @Override
    public List<AttendanceResponse> getAttendanceByDate(LocalDate date) {

        List<Attendance> attendanceList =
                attendanceRepository.findByAttendanceDate(date);

        List<AttendanceResponse> responseList =
                new ArrayList<>();

        for (Attendance attendance : attendanceList) {
            responseList.add(mapToResponse(attendance));
        }

        return responseList;
    }
    private AttendanceResponse mapToResponse(Attendance attendance) {

        AttendanceResponse response = new AttendanceResponse();

        response.setId(attendance.getId());

        response.setAttendanceDate(attendance.getAttendanceDate());

        response.setCheckIn(attendance.getCheckIn());

        response.setCheckOut(attendance.getCheckOut());

        response.setAttendanceStatus(attendance.getAttendanceStatus());

        response.setRemarks(attendance.getRemarks());

        response.setWorkingHours(attendance.getWorkingHours());

        Employee employee = attendance.getEmployee();

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