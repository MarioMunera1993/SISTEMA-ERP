package com.example.system_erp.printers.repositories;

import com.example.system_erp.printers.models.Printer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PrinterRepository extends JpaRepository<Printer, Long> {
    Optional<Printer> findBySerialNumber(String serialNumber);

    Optional<Printer> findByPrinterNumber(String printerNumber);
}
