package com.pranay.ems.service.impl;

import com.pranay.ems.dto.request.PayrollRequest;
import com.pranay.ems.dto.response.PayrollResponse;
import com.pranay.ems.entity.Employee;
import com.pranay.ems.entity.Payroll;
import com.pranay.ems.exception.DuplicateResourceException;
import com.pranay.ems.exception.ResourceNotFoundException;
import com.pranay.ems.repository.EmployeeRepository;
import com.pranay.ems.repository.PayrollRepository;
import com.pranay.ems.service.PayrollService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PayrollServiceImpl implements PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;

    public PayrollServiceImpl(PayrollRepository payrollRepository,
                              EmployeeRepository employeeRepository) {
        this.payrollRepository = payrollRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public PayrollResponse generatePayroll(PayrollRequest request) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with ID : "
                                        + request.getEmployeeId()));

        if (payrollRepository.findByEmployeeAndMonthAndYear(
                employee,
                request.getMonth(),
                request.getYear()).isPresent()) {

            throw new DuplicateResourceException(
                    "Payroll already generated for this employee.");
        }

        BigDecimal grossSalary =
                request.getBasicSalary()
                        .add(request.getHra())
                        .add(request.getDa())
                        .add(request.getMedicalAllowance())
                        .add(request.getBonus());

        BigDecimal totalDeduction =
                request.getPf()
                        .add(request.getTax())
                        .add(request.getOtherDeductions());

        BigDecimal netSalary =
                grossSalary.subtract(totalDeduction);

        Payroll payroll = new Payroll();

        payroll.setEmployee(employee);
        payroll.setMonth(request.getMonth());
        payroll.setYear(request.getYear());

        payroll.setBasicSalary(request.getBasicSalary());
        payroll.setHra(request.getHra());
        payroll.setDa(request.getDa());
        payroll.setMedicalAllowance(request.getMedicalAllowance());
        payroll.setBonus(request.getBonus());

        payroll.setPf(request.getPf());
        payroll.setTax(request.getTax());
        payroll.setOtherDeductions(request.getOtherDeductions());

        payroll.setGrossSalary(grossSalary);
        payroll.setNetSalary(netSalary);

        payroll.setGeneratedDate(LocalDate.now());

        Payroll savedPayroll = payrollRepository.save(payroll);

        return mapToPayrollResponse(savedPayroll);
    }
    @Override
    public PayrollResponse getPayrollById(Long id) {

        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payroll not found with ID : " + id));

        return mapToPayrollResponse(payroll);
    }

    @Override
    public List<PayrollResponse> getAllPayrolls() {

        List<Payroll> payrolls = payrollRepository.findAll();

        List<PayrollResponse> responseList = new ArrayList<>();

        for (Payroll payroll : payrolls) {
            responseList.add(mapToPayrollResponse(payroll));
        }

        return responseList;
    }

    @Override
    public List<PayrollResponse> getPayrollByEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with ID : " + employeeId));

        List<Payroll> payrolls =
                payrollRepository.findByEmployee(employee);

        List<PayrollResponse> responseList = new ArrayList<>();

        for (Payroll payroll : payrolls) {
            responseList.add(mapToPayrollResponse(payroll));
        }

        return responseList;
    }

    @Override
    public List<PayrollResponse> getPayrollByMonth(Integer month) {

        List<Payroll> payrolls =
                payrollRepository.findByMonth(month);

        List<PayrollResponse> responseList = new ArrayList<>();

        for (Payroll payroll : payrolls) {
            responseList.add(mapToPayrollResponse(payroll));
        }

        return responseList;
    }

    @Override
    public List<PayrollResponse> getPayrollByYear(Integer year) {

        List<Payroll> payrolls =
                payrollRepository.findByYear(year);

        List<PayrollResponse> responseList = new ArrayList<>();

        for (Payroll payroll : payrolls) {
            responseList.add(mapToPayrollResponse(payroll));
        }

        return responseList;
    }
    @Override
    public List<PayrollResponse> getPayrollByMonthAndYear(
            Integer month,
            Integer year) {

        List<Payroll> payrolls =
                payrollRepository.findByMonthAndYear(month, year);

        List<PayrollResponse> responseList = new ArrayList<>();

        for (Payroll payroll : payrolls) {
            responseList.add(mapToPayrollResponse(payroll));
        }

        return responseList;
    }

    @Override
    public void deletePayroll(Long id) {

        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payroll not found with ID : " + id));

        payrollRepository.delete(payroll);
    }

    private PayrollResponse mapToPayrollResponse(Payroll payroll) {

        PayrollResponse response = new PayrollResponse();

        response.setId(payroll.getId());

        response.setEmployeeId(
                payroll.getEmployee().getId());

        response.setEmployeeName(
                payroll.getEmployee().getFirstName()
                        + " "
                        + payroll.getEmployee().getLastName());

        response.setMonth(payroll.getMonth());
        response.setYear(payroll.getYear());

        response.setBasicSalary(payroll.getBasicSalary());
        response.setHra(payroll.getHra());
        response.setDa(payroll.getDa());
        response.setMedicalAllowance(payroll.getMedicalAllowance());
        response.setBonus(payroll.getBonus());

        response.setPf(payroll.getPf());
        response.setTax(payroll.getTax());
        response.setOtherDeductions(payroll.getOtherDeductions());

        response.setGrossSalary(payroll.getGrossSalary());
        response.setNetSalary(payroll.getNetSalary());

        response.setGeneratedDate(payroll.getGeneratedDate());

        return response;
    }

}