package com.pranay.ems.dto.response;

import com.pranay.ems.enums.LeaveStatus;
import com.pranay.ems.enums.LeaveType;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveResponse {

    private Long id;

    private String employeeCode;

    private String employeeName;

    private String departmentName;

    private LeaveType leaveType;

    private LocalDate startDate;

    private LocalDate endDate;

    private String reason;

    private LeaveStatus status;

    private String approvedBy;

    private LocalDate approvedDate;
}