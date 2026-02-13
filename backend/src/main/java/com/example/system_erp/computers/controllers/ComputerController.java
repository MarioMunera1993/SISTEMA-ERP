package com.example.system_erp.computers.controllers;

import com.example.system_erp.computers.models.Computer;
import com.example.system_erp.computers.repositories.ComputerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/computers")
@CrossOrigin(origins = "*")
public class ComputerController {

    @Autowired
    private ComputerRepository computerRepository;

    @GetMapping
    public List<Computer> getAll() {
        return computerRepository.findByIsActiveTrue();
    }

    @PostMapping
    public Computer save(@RequestBody Computer computer) {
        // Aseguramos que los componentes mantengan la relación bidireccional
        if (computer.getRamMemories() != null) {
            computer.getRamMemories().forEach(ram -> ram.setComputer(computer));
        }

        if (computer.getStorageDevices() != null) {
            computer.getStorageDevices().forEach(storage -> storage.setComputer(computer));
        }

        return computerRepository.save(computer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Computer> getById(@PathVariable Long id) {
        return computerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return computerRepository.findById(id)
                .map(computer -> {
                    computer.setActive(false);
                    computerRepository.save(computer);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
