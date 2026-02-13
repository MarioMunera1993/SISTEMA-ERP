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
