package com.inventario.tech_api.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "estados") // Debe coincidir con el nombre en MySQL
@Data
public class Estado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;


}
