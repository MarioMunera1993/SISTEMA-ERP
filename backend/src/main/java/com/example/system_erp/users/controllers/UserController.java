package com.example.system_erp.users.controllers;

import com.example.system_erp.users.models.User;
import com.example.system_erp.users.models.Role;
import com.example.system_erp.users.repositories.UserRepository;
import com.example.system_erp.users.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/register")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Verificar si el usuario ya existe
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body("El usuario ya existe");
            }

            // Hashear la contraseña
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Asignar rol por defecto OPERATOR si no tiene
            if (user.getRole() == null) {
                Role operatorRole = roleRepository.findByName("OPERATOR")
                        .orElseThrow(() -> new RuntimeException("Rol OPERATOR no existe"));
                user.setRole(operatorRole);
            }

            // Guardar el usuario
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok("Usuario registrado exitosamente");

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint temporal para resetear contraseña de admin
    @PostMapping("/reset-admin-password")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> resetAdminPassword(@RequestParam String newPassword) {
        try {
            User user = userRepository.findByUsername("admin")
                    .orElseThrow(() -> new RuntimeException("Usuario admin no encontrado"));

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            return ResponseEntity.ok("Contraseña de admin actualizada");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            user.setFullName(userDetails.getFullName());
            user.setEmail(userDetails.getEmail());
            user.setActive(userDetails.isActive());

            if (userDetails.getRole() != null) {
                user.setRole(userDetails.getRole());
            }

            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }

            userRepository.save(user);
            return ResponseEntity.ok("Usuario actualizado exitosamente");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (user.getUsername().equals("admin")) {
                return ResponseEntity.badRequest().body("No se puede eliminar el usuario administrador principal");
            }

            userRepository.delete(user);
            return ResponseEntity.ok("Usuario eliminado exitosamente");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
