package com.pranay.ems.dto.response;

import com.pranay.ems.enums.AttendanceStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceResponse {

    private Long id;

    private String employeeCode;

    private String employeeName;

    private String departmentName;

    private LocalDate attendanceDate;

    private LocalDateTime checkIn;

    private LocalDateTime checkOut;

    private Long workingHours;

    private AttendanceStatus attendanceStatus;

    private String remarks;
}