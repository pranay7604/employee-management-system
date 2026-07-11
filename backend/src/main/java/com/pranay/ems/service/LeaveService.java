package com.pranay.ems.service;

import com.pranay.ems.dto.request.LeaveRequestDto;
import com.pranay.ems.dto.response.LeaveResponse;
import com.pranay.ems.enums.LeaveStatus;

import java.util.List;

public interface LeaveService {

    LeaveResponse applyLeave(LeaveRequestDto request);

    LeaveResponse approveLeave(Long leaveId, String approvedBy);

    LeaveResponse rejectLeave(Long leaveId, String approvedBy);

    List<LeaveResponse> getAllLeaves();

    LeaveResponse getLeaveById(Long id);

    List<LeaveResponse> getLeavesByEmployee(Long employeeId);

    List<LeaveResponse> getLeavesByStatus(LeaveStatus status);

}