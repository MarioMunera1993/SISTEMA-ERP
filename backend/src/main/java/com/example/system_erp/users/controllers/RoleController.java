package com.example.system_erp.users.controllers;

import com.example.system_erp.users.models.Role;
import com.example.system_erp.users.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "*")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        System.out.println("DEBUG: Fetching all roles...");
        List<Role> roles = roleRepository.findAll();
        System.out.println("DEBUG: Roles found: " + roles.size());
        return ResponseEntity.ok(roles);
    }
}
