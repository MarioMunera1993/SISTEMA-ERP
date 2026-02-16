package com.example.system_erp.printers.repositories;

import com.example.system_erp.printers.models.PrinterMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PrinterMaintenanceRepository extends JpaRepository<PrinterMaintenance, Long> {
    List<PrinterMaintenance> findByPrinterId(Long printerId);
}
