package com.pranay.ems.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentResponse {

    private Long id;

    private String departmentCode;

    private String departmentName;

    private String description;

    private String location;

    private Boolean active;
}