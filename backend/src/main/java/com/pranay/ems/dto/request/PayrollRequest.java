package com.pranay.ems.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class PayrollRequest {

    @NotNull
    private Long employeeId;

    @NotNull
    @Min(1)
    private Integer month;

    @NotNull
    private Integer year;

    @NotNull
    private BigDecimal basicSalary;

    @NotNull
    private BigDecimal hra;

    @NotNull
    private BigDecimal da;

    @NotNull
    private BigDecimal medicalAllowance;

    @NotNull
    private BigDecimal bonus;

    @NotNull
    private BigDecimal pf;

    @NotNull
    private BigDecimal tax;

    @NotNull
    private BigDecimal otherDeductions;

    public PayrollRequest() {
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public Integer getMonth() {
        return month;
    }

    public Integer getYear() {
        return year;
    }

    public BigDecimal getBasicSalary() {
        return basicSalary;
    }

    public BigDecimal getHra() {
        return hra;
    }

    public BigDecimal getDa() {
        return da;
    }

    public BigDecimal getMedicalAllowance() {
        return medicalAllowance;
    }

    public BigDecimal getBonus() {
        return bonus;
    }

    public BigDecimal getPf() {
        return pf;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public BigDecimal getOtherDeductions() {
        return otherDeductions;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setBasicSalary(BigDecimal basicSalary) {
        this.basicSalary = basicSalary;
    }

    public void setHra(BigDecimal hra) {
        this.hra = hra;
    }

    public void setDa(BigDecimal da) {
        this.da = da;
    }

    public void setMedicalAllowance(BigDecimal medicalAllowance) {
        this.medicalAllowance = medicalAllowance;
    }

    public void setBonus(BigDecimal bonus) {
        this.bonus = bonus;
    }

    public void setPf(BigDecimal pf) {
        this.pf = pf;
    }

    public void setTax(BigDecimal tax) {
        this.tax = tax;
    }

    public void setOtherDeductions(BigDecimal otherDeductions) {
        this.otherDeductions = otherDeductions;
    }
}