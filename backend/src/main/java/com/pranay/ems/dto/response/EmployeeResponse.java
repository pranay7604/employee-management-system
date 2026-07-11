package com.pranay.ems.dto.response;

import com.pranay.ems.enums.EmployeeStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponse {

    private Long id;

    private String employeeCode;

    private String fullName;

    private String email;

    private String designation;

    private EmployeeStatus status;
}