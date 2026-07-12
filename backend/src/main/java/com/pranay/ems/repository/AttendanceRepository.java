package com.pranay.ems.repository;

import com.pranay.ems.entity.Attendance;
import com.pranay.ems.entity.Employee;
import com.pranay.ems.enums.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEmployeeAndAttendanceDate(
            Employee employee,
            LocalDate attendanceDate);

    List<Attendance> findByEmployee(Employee employee);

    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    long countByAttendanceDate(LocalDate attendanceDate);

    long countByAttendanceDateAndAttendanceStatus(
            LocalDate attendanceDate,
            AttendanceStatus attendanceStatus);

}