package com.example.system_erp.catalogs.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "branches")
@Data
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String location; // Antes: ubicacion
}
