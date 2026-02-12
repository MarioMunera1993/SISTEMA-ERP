package com.example.system_erp.printers.services;

import com.example.system_erp.printers.models.Printer;
import com.example.system_erp.printers.repositories.PrinterRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PrinterService {

    private final PrinterRepository printerRepository;

    // ✅ Inyección por constructor (Práctica Senior: elimina la alerta de
    // @Autowired)
    public PrinterService(PrinterRepository printerRepository) {
        this.printerRepository = printerRepository;
    }

    public Printer save(Printer printer) {
        // Validar Serial Number (Solo si es nuevo o cambió)
        printerRepository.findBySerialNumber(printer.getSerialNumber())
                .ifPresent(p -> {
                    if (!p.getId().equals(printer.getId())) {
                        throw new RuntimeException("SerialNumber already exists");
                    }
                });

        return printerRepository.save(printer);
    }

    public List<Printer> findAll() {
        return printerRepository.findAll();
    }

    public Optional<Printer> findById(Long id) {
        return printerRepository.findById(id);
    }

    public void deleteById(Long id) {
        printerRepository.deleteById(id);
    }
}
