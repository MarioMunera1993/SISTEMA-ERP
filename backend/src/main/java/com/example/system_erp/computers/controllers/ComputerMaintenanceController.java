package com.example.system_erp.computers.controllers;

import com.example.system_erp.computers.models.Computer;
import com.example.system_erp.computers.models.ComputerMaintenance;
import com.example.system_erp.computers.repositories.ComputerMaintenanceRepository;
import com.example.system_erp.computers.repositories.ComputerRepository;
import com.example.system_erp.services.FileStorageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/computer-maintenances")
@CrossOrigin(origins = "*")
public class ComputerMaintenanceController {

    @Autowired
    private ComputerMaintenanceRepository maintenanceRepository;

    @Autowired
    private ComputerRepository computerRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public List<ComputerMaintenance> getAllMaintenances() {
        return maintenanceRepository.findAll();
    }

    @GetMapping("/computer/{computerId}")
    public List<ComputerMaintenance> getMaintenancesByComputer(@PathVariable Long computerId) {
        return maintenanceRepository.findByComputerId(computerId);
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<?> createMaintenance(
            @RequestParam("maintenance") String maintenanceJson,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            ComputerMaintenance maintenance = objectMapper.readValue(maintenanceJson, ComputerMaintenance.class);

            if (maintenance.getComputer() == null || maintenance.getComputer().getId() == null) {
                return ResponseEntity.badRequest().body("El computador es obligatorio");
            }

            Long computerId = Objects.requireNonNull(maintenance.getComputer().getId());
            Computer computer = computerRepository.findById(computerId)
                    .orElseThrow(() -> new RuntimeException("Computador no encontrado"));

            maintenance.setComputer(computer);

            if (file != null && !file.isEmpty()) {
                String dateStr = maintenance.getMaintenanceDate().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
                String preferredFileName = computer.getTeamNumber() + "-" + dateStr;
                String fileName = fileStorageService.storeFile(file, preferredFileName);
                maintenance.setAttachmentPath(fileName);
            }

            return ResponseEntity.ok(maintenanceRepository.save(maintenance));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al procesar el mantenimiento: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<?> updateMaintenance(
            @PathVariable Long id,
            @RequestParam("maintenance") String maintenanceJson,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            ComputerMaintenance existingMaintenance = maintenanceRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Mantenimiento no encontrado"));

            ComputerMaintenance updatedData = objectMapper.readValue(maintenanceJson, ComputerMaintenance.class);

            existingMaintenance.setMaintenanceDate(updatedData.getMaintenanceDate());
            existingMaintenance.setObservations(updatedData.getObservations());

            if (file != null && !file.isEmpty()) {
                String dateStr = updatedData.getMaintenanceDate().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
                String preferredFileName = existingMaintenance.getComputer().getTeamNumber() + "-" + dateStr;
                String fileName = fileStorageService.storeFile(file, preferredFileName);
                existingMaintenance.setAttachmentPath(fileName);
            }

            return ResponseEntity.ok(maintenanceRepository.save(existingMaintenance));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al actualizar el mantenimiento: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaintenance(@PathVariable Long id) {
        maintenanceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
