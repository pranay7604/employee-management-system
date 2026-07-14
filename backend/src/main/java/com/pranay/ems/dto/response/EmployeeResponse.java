package com.pranay.ems.dto.response;

import com.pranay.ems.enums.EmployeeStatus;
import com.pranay.ems.enums.Gender;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponse {

        private Long id;

        private String employeeCode;

        private String firstName;

        private String lastName;

        private String fullName;

        private String email;

        private String phone;

        private Gender gender;

        private LocalDate dateOfBirth;

        private LocalDate joiningDate;

        private String designation;

        private BigDecimal salary;

        private String address;

        private EmployeeStatus status;

        private Long departmentId;

        private String departmentName;

        private Long userId;
    }