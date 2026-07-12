package com.pranay.ems.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PayrollResponse {

    private Long id;
    private Long employeeId;
    private String employeeName;

    private Integer month;
    private Integer year;

    private BigDecimal basicSalary;
    private BigDecimal hra;
    private BigDecimal da;
    private BigDecimal medicalAllowance;
    private BigDecimal bonus;

    private BigDecimal pf;
    private BigDecimal tax;
    private BigDecimal otherDeductions;

    private BigDecimal grossSalary;
    private BigDecimal netSalary;

    private LocalDate generatedDate;

    public PayrollResponse() {
    }

    public Long getId() {
        return id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
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

    public BigDecimal getGrossSalary() {
        return grossSalary;
    }

    public BigDecimal getNetSalary() {
        return netSalary;
    }

    public LocalDate getGeneratedDate() {
        return generatedDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
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

    public void setGrossSalary(BigDecimal grossSalary) {
        this.grossSalary = grossSalary;
    }

    public void setNetSalary(BigDecimal netSalary) {
        this.netSalary = netSalary;
    }

    public void setGeneratedDate(LocalDate generatedDate) {
        this.generatedDate = generatedDate;
    }
}