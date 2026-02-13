package com.example.system_erp.catalogs.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "equipment_statuses")
@Data
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class EquipmentStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;
}
