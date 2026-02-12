package com.inventario.tech_api.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sedes") // Debe coincidir con el nombre en MySQL
@Data
public class Sede {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 255)
    private String ubicacion;
}
