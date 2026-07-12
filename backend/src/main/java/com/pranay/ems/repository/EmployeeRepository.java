package com.pranay.ems.repository;

import com.pranay.ems.entity.Employee;
import com.pranay.ems.enums.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeCode(String employeeCode);

    Optional<Employee> findByEmail(String email);

    boolean existsByEmployeeCode(String employeeCode);

    boolean existsByEmail(String email);

    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmployeeCodeContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String firstName,
            String lastName,
            String employeeCode,
            String email
    );
    List<Employee> findByStatus(EmployeeStatus status);
    List<Employee> findByDesignationContainingIgnoreCase(String designation);
    long countByStatus(EmployeeStatus status);
}