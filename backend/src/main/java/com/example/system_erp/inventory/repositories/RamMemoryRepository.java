package com.example.system_erp.inventory.repositories;

import com.example.system_erp.inventory.models.RamMemory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RamMemoryRepository extends JpaRepository<RamMemory, Long> {
    List<RamMemory> findByIsActiveTrue();
}
