package com.example.system_erp.printers.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity // Esto le dice a Java que esta clase es una tabla de base de datos
@Table(name = "impresoras") // Le indica el nombre exacto de la tabla en MySQL
@Data // Esta es la "magia" de Lombok que crea los Getters y Setters automáticamente

public class Printer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand; // marca

    @Column(nullable = false)
    private String model; // modelo

    @Column(name = "printer_number", unique = true, nullable = false)
    private String printerNumber; // numeroImpresora

    @Column(name = "serial_number", unique = true, nullable = false)
    private String serialNumber; // numeroSerie

    @Column(name = "type_id")
    private Integer typeId; // idTipo

    @Column(name = "is_color")
    private Boolean isColor; // esColor

    @Column(name = "branch_id")
    private Integer branchId; // idSede (Sede -> Branch o Location)

    @Column(name = "responsible_person", nullable = false)
    private String responsiblePerson; // personaEncargada

    @Column(nullable = false)
    private String ip;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate; // fechaCompra

    @Column(name = "created_at")
    private LocalDate createdAt; // fechaCreacion (Estándar: created_at)

    @Column(name = "updated_at")
    private LocalDate updatedAt; // fechaActualizacion (Estándar: updated_at)

    @Column(name = "status_id")
    private Integer statusId; // idEstado

}
