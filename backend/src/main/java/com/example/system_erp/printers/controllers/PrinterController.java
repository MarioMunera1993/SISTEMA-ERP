package com.example.system_erp.printers.controllers;

import com.example.system_erp.printers.models.Printer;
import com.example.system_erp.printers.services.PrinterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/printers")
@CrossOrigin(origins = "*") // 🌍 Importante para que React pueda comunicarse
public class PrinterController {

    private final PrinterService printerService;

    // ✅ Inyección por constructor (Seguimos el estándar Senior)
    public PrinterController(PrinterService printerService) {
        this.printerService = printerService;
    }

    // GET: Obtener todas
    @GetMapping
    public List<Printer> getAll() {
        return printerService.findAll();
    }

    // GET: Obtener una por ID
    @GetMapping("/{id}")
    public ResponseEntity<Printer> getById(@PathVariable Long id) {
        return printerService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Crear nueva
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Printer printer) {
        try {
            return ResponseEntity.ok(printerService.save(printer));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DELETE: Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        printerService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
