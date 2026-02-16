package com.example.system_erp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/admin/system")
public class DatabaseCleanupController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/reset-data")
    public ResponseEntity<String> resetData() {
        try {
            // Desactivar FK checks
            jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 0");

            List<String> tablesToTruncate = Arrays.asList(
                    "computer_maintenances",
                    "printer_maintenances",
                    "ram_memories",
                    "storage_devices",
                    "computers",
                    "printers",
                    "phones",
                    "branches",
                    "equipment_statuses",
                    "equipment_types");

            for (String table : tablesToTruncate) {
                jdbcTemplate.execute("TRUNCATE TABLE " + table);
            }

            // Reactivar FK checks
            jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 1");

            // Re-insertar catálogos básicos
            jdbcTemplate.execute(
                    "INSERT INTO equipment_statuses (id, name) VALUES (1, 'En Uso'), (2, 'En Bodega'), (3, 'Dañado'), (4, 'En Reparación')");
            jdbcTemplate.execute(
                    "INSERT INTO equipment_types (id, name) VALUES (1, 'Portátil'), (2, 'Escritorio'), (3, 'Servidor')");

            return ResponseEntity.ok("Base de datos limpiada y IDs reiniciados con éxito.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al limpiar la base de datos: " + e.getMessage());
        }
    }
}
