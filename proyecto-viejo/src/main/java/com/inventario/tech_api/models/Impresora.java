package com.inventario.tech_api.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity // Esto le dice a Java que esta clase es una tabla de base de datos
@Table(name = "impresoras") // Le indica el nombre exacto de la tabla en MySQL
@Data // Esta es la "magia" de Lombok que crea los Getters y Setters automáticamente

public class Impresora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private String modelo;

    @Column(name = "numero_impresora", unique = true, nullable = false)
    private String numeroImpresora;

    @Column(name = "numero_serie", unique = true, nullable = false)
    private String numeroSerie;

    @Column(name = "id_tipo")
    private Integer idTipo;

    @Column(name = "es_color")
    private Boolean esColor;

    @Column(name = "id_sede")
    private Integer idSede;

    @Column(name = "fecha_compra")
    private LocalDate fechaCompra;

    @Column(name = "id_estado")
    private Integer idEstado;
}
