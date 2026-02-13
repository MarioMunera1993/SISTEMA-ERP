package com.example.system_erp.inventory.controllers;

import com.example.system_erp.inventory.models.RamMemory;
import com.example.system_erp.inventory.repositories.RamMemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ram")
@CrossOrigin(origins = "*")
public class RamMemoryController {

    @Autowired
    private RamMemoryRepository ramRepository;

    @GetMapping
    public List<RamMemory> getAll() {
        return ramRepository.findByIsActiveTrue();
    }

    @PostMapping
    public RamMemory save(@RequestBody RamMemory ram) {
        if (ram.getId() != null) {
            return ramRepository.findById(ram.getId())
                    .map(existingRam -> {
                        existingRam.setBrand(ram.getBrand());
                        existingRam.setModel(ram.getModel());
                        existingRam.setCapacity(ram.getCapacity());
                        existingRam.setType(ram.getType());
                        existingRam.setSpeed(ram.getSpeed());
                        existingRam.setSerialNumber(ram.getSerialNumber());
                        // Si ya tiene un computador asociado y el que llega es nulo, mantenemos el
                        // actual
                        if (ram.getComputer() == null && existingRam.getComputer() != null) {
                            // No hacemos nada, conservamos existingRam.getComputer()
                        } else {
                            existingRam.setComputer(ram.getComputer());
                        }
                        return ramRepository.save(existingRam);
                    }).orElseGet(() -> ramRepository.save(ram));
        }
        return ramRepository.save(ram);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return ramRepository.findById(id)
                .map(ram -> {
                    ram.setActive(false);
                    ramRepository.save(ram);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
