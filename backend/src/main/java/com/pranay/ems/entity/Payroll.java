package com.pranay.ems.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "payroll")
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private Integer month;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal basicSalary;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal hra;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal da;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal medicalAllowance;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal bonus;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal pf;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal tax;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal otherDeductions;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal grossSalary;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal netSalary;

    private LocalDate generatedDate;

    public Payroll() {
    }

    public Payroll(Long id,
                   Employee employee,
                   Integer month,
                   Integer year,
                   BigDecimal basicSalary,
                   BigDecimal hra,
                   BigDecimal da,
                   BigDecimal medicalAllowance,
                   BigDecimal bonus,
                   BigDecimal pf,
                   BigDecimal tax,
                   BigDecimal otherDeductions,
                   BigDecimal grossSalary,
                   BigDecimal netSalary,
                   LocalDate generatedDate) {

        this.id = id;
        this.employee = employee;
        this.month = month;
        this.year = year;
        this.basicSalary = basicSalary;
        this.hra = hra;
        this.da = da;
        this.medicalAllowance = medicalAllowance;
        this.bonus = bonus;
        this.pf = pf;
        this.tax = tax;
        this.otherDeductions = otherDeductions;
        this.grossSalary = grossSalary;
        this.netSalary = netSalary;
        this.generatedDate = generatedDate;
    }

    public Long getId() {
        return id;
    }

    public Employee getEmployee() {
        return employee;
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

    public void setEmployee(Employee employee) {
        this.employee = employee;
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