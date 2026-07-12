package com.pranay.ems.dto.response;

import java.math.BigDecimal;

public class DashboardResponse {

    private Long totalEmployees;
    private Long activeEmployees;
    private Long inactiveEmployees;

    private Long totalDepartments;

    private Long todayAttendance;
    private Long presentEmployees;
    private Long absentEmployees;

    private Long pendingLeaves;
    private Long approvedLeaves;
    private Long rejectedLeaves;

    private Long totalPayrollGenerated;

    private BigDecimal monthlySalaryExpense;

    public DashboardResponse() {
    }

    public Long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(Long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public Long getActiveEmployees() {
        return activeEmployees;
    }

    public void setActiveEmployees(Long activeEmployees) {
        this.activeEmployees = activeEmployees;
    }

    public Long getInactiveEmployees() {
        return inactiveEmployees;
    }

    public void setInactiveEmployees(Long inactiveEmployees) {
        this.inactiveEmployees = inactiveEmployees;
    }

    public Long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(Long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public Long getTodayAttendance() {
        return todayAttendance;
    }

    public void setTodayAttendance(Long todayAttendance) {
        this.todayAttendance = todayAttendance;
    }

    public Long getPresentEmployees() {
        return presentEmployees;
    }

    public void setPresentEmployees(Long presentEmployees) {
        this.presentEmployees = presentEmployees;
    }

    public Long getAbsentEmployees() {
        return absentEmployees;
    }

    public void setAbsentEmployees(Long absentEmployees) {
        this.absentEmployees = absentEmployees;
    }

    public Long getPendingLeaves() {
        return pendingLeaves;
    }

    public void setPendingLeaves(Long pendingLeaves) {
        this.pendingLeaves = pendingLeaves;
    }

    public Long getApprovedLeaves() {
        return approvedLeaves;
    }

    public void setApprovedLeaves(Long approvedLeaves) {
        this.approvedLeaves = approvedLeaves;
    }

    public Long getRejectedLeaves() {
        return rejectedLeaves;
    }

    public void setRejectedLeaves(Long rejectedLeaves) {
        this.rejectedLeaves = rejectedLeaves;
    }

    public Long getTotalPayrollGenerated() {
        return totalPayrollGenerated;
    }

    public void setTotalPayrollGenerated(Long totalPayrollGenerated) {
        this.totalPayrollGenerated = totalPayrollGenerated;
    }

    public BigDecimal getMonthlySalaryExpense() {
        return monthlySalaryExpense;
    }

    public void setMonthlySalaryExpense(BigDecimal monthlySalaryExpense) {
        this.monthlySalaryExpense = monthlySalaryExpense;
    }
}