package com.pranay.ems.repository;

import com.pranay.ems.entity.Employee;
import com.pranay.ems.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Query;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    Optional<Payroll> findByEmployeeAndMonthAndYear(
            Employee employee,
            Integer month,
            Integer year);

    List<Payroll> findByEmployee(Employee employee);

    List<Payroll> findByMonth(Integer month);

    List<Payroll> findByYear(Integer year);

    List<Payroll> findByMonthAndYear(
            Integer month,
            Integer year);
    @Query("""
SELECT COALESCE(SUM(p.netSalary),0)
FROM Payroll p
WHERE p.month = :month
AND p.year = :year
""")
    BigDecimal getMonthlySalaryExpense(
            Integer month,
            Integer year);
}