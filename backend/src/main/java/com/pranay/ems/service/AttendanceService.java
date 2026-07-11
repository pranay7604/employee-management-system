package com.pranay.ems.service;

import com.pranay.ems.dto.request.AttendanceRequest;
import com.pranay.ems.dto.response.AttendanceResponse;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {

    AttendanceResponse checkIn(AttendanceRequest request);

    AttendanceResponse checkOut(Long attendanceId);

    List<AttendanceResponse> getAllAttendance();

    AttendanceResponse getAttendanceById(Long id);

    List<AttendanceResponse> getAttendanceByEmployee(Long employeeId);

    List<AttendanceResponse> getAttendanceByDate(LocalDate date);

}