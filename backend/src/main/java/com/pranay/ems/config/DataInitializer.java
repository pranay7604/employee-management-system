package com.pranay.ems.config;

import com.pranay.ems.entity.Role;
import com.pranay.ems.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {

        if (roleRepository.findByName("ADMIN").isEmpty()) {
            roleRepository.save(new Role("ADMIN"));
        }

        if (roleRepository.findByName("HR").isEmpty()) {
            roleRepository.save(new Role("HR"));
        }

        if (roleRepository.findByName("EMPLOYEE").isEmpty()) {
            roleRepository.save(new Role("EMPLOYEE"));
        }

        System.out.println("Default roles inserted successfully.");
    }
}