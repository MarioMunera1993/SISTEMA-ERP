package com.example.system_erp.inventory.controllers;

import com.example.system_erp.inventory.models.StorageDevice;
import com.example.system_erp.inventory.repositories.StorageDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/storage")
@CrossOrigin(origins = "*")
public class StorageDeviceController {

    @Autowired
    private StorageDeviceRepository storageRepository;

    @GetMapping
    public List<StorageDevice> getAll() {
        return storageRepository.findByIsActiveTrue();
    }

    @PostMapping
    public StorageDevice save(@RequestBody StorageDevice storage) {
        return storageRepository.save(storage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return storageRepository.findById(id)
                .map(storage -> {
                    storage.setActive(false);
                    storageRepository.save(storage);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
