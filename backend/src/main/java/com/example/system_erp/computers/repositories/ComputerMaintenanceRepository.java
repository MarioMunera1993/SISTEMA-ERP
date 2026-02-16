package com.example.system_erp.computers.repositories;

import com.example.system_erp.computers.models.ComputerMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComputerMaintenanceRepository extends JpaRepository<ComputerMaintenance, Long> {
    List<ComputerMaintenance> findByComputerId(Long computerId);
}
