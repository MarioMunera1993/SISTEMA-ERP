package com.example.system_erp.controllers;

import com.example.system_erp.computers.repositories.ComputerMaintenanceRepository;
import com.example.system_erp.computers.repositories.ComputerRepository;
import com.example.system_erp.phones.repositories.PhoneRepository;
import com.example.system_erp.printers.repositories.PrinterMaintenanceRepository;
import com.example.system_erp.printers.repositories.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private ComputerRepository computerRepository;

    @Autowired
    private PrinterRepository printerRepository;

    @Autowired
    private PhoneRepository phoneRepository;

    @Autowired
    private ComputerMaintenanceRepository computerMaintenanceRepository;

    @Autowired
    private PrinterMaintenanceRepository printerMaintenanceRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Conteos Totales
        stats.put("totalComputers", computerRepository.count());
        stats.put("totalPrinters", printerRepository.count());
        stats.put("totalPhones", phoneRepository.count());

        // Mantenimientos Recientes (Últimos 30 días)
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);

        long recentComputerMaintenances = computerMaintenanceRepository.findAll().stream()
                .filter(m -> !m.getMaintenanceDate().isBefore(thirtyDaysAgo))
                .count();

        long recentPrinterMaintenances = printerMaintenanceRepository.findAll().stream()
                .filter(m -> !m.getMaintenanceDate().isBefore(thirtyDaysAgo))
                .count();

        stats.put("recentMaintenances", recentComputerMaintenances + recentPrinterMaintenances);

        return ResponseEntity.ok(stats);
    }
}
