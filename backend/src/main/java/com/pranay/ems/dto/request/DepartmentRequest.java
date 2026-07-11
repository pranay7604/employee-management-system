package com.pranay.ems.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentRequest {

    @NotBlank(message = "Department code is required")
    private String departmentCode;

    @NotBlank(message = "Department name is required")
    private String departmentName;

    private String description;

    @NotBlank(message = "Location is required")
    private String location;
}