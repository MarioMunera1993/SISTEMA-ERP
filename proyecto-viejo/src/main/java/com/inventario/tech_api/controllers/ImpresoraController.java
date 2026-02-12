package com.inventario.tech_api.controllers;

import com.inventario.tech_api.models.Impresora;
import com.inventario.tech_api.repositories.ImpresoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Define que esto es un API REST
@RequestMapping("/api/impresoras") // La URL base será http://localhost:8080/api/impresoras
@CrossOrigin(origins = "*") // Permite que React (en otro puerto) se conecte sin bloqueos

public class ImpresoraController {

    @Autowired // Inyecta automáticamente el repositorio que creamos antes
    private ImpresoraRepository impresoraRepository;

    // Metodo para obtener todas las impresoras
    @GetMapping
    public List<Impresora> listarTodas() {
        return impresoraRepository.findAll();
    }

    @PutMapping("/{id}") // Metodo para actualizar una impresora existente
    public Impresora actualizar(@PathVariable Long id, @RequestBody Impresora detallesActualizados) {
        return impresoraRepository.findById(id)
                .map(impresora -> {
                    impresora.setMarca(detallesActualizados.getMarca());
                    impresora.setModelo(detallesActualizados.getModelo());
                    impresora.setNumeroImpresora(detallesActualizados.getNumeroImpresora());
                    impresora.setNumeroSerie(detallesActualizados.getNumeroSerie());
                    impresora.setEsColor(detallesActualizados.getEsColor());
                    impresora.setIdSede(detallesActualizados.getIdSede());
                    impresora.setIdTipo(detallesActualizados.getIdTipo());
                    impresora.setIdEstado(detallesActualizados.getIdEstado());
                    return impresoraRepository.save(impresora);
                })
                .orElseThrow(() -> new RuntimeException("Impresora no encontrada con id " + id));
    }

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Impresora impresora) {
        // Validar si la serie ya existe
        if (impresoraRepository.existsByNumeroSerie(impresora.getNumeroSerie())) {
            return ResponseEntity.badRequest().body("El número de serie ya está registrado.");
        }
        // Validar si la placa/inventario ya existe
        if (impresoraRepository.existsByNumeroImpresora(impresora.getNumeroImpresora())) {
            return ResponseEntity.badRequest().body("El número de inventario ya está registrado.");
        }

        return ResponseEntity.ok(impresoraRepository.save(impresora));
    }
}
