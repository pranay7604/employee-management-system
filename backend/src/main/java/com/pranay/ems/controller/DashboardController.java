package com.pranay.ems.controller;

import com.pranay.ems.dto.response.DashboardResponse;
import com.pranay.ems.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard() {

        return ResponseEntity.ok(
                dashboardService.getDashboardSummary());
    }
}