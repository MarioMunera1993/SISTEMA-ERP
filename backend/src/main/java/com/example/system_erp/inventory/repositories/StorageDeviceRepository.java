package com.example.system_erp.inventory.repositories;

import com.example.system_erp.inventory.models.StorageDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StorageDeviceRepository extends JpaRepository<StorageDevice, Long> {
    List<StorageDevice> findByIsActiveTrue();
}
