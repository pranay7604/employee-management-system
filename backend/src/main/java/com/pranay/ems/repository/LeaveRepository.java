package com.pranay.ems.repository;

import com.pranay.ems.entity.Employee;
import com.pranay.ems.entity.LeaveRequest;
import com.pranay.ems.enums.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployee(Employee employee);

    List<LeaveRequest> findByStatus(LeaveStatus status);

    List<LeaveRequest> findByStartDateBetween(LocalDate startDate,
                                              LocalDate endDate);

    boolean existsByEmployeeAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Employee employee,
            LocalDate endDate,
            LocalDate startDate
    );
}