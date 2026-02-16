package com.example.system_erp.computers.models;

import com.example.system_erp.catalogs.models.Branch;
import com.example.system_erp.catalogs.models.EquipmentStatus;
import com.example.system_erp.catalogs.models.EquipmentType;
import com.example.system_erp.inventory.models.RamMemory;
import com.example.system_erp.inventory.models.StorageDevice;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "computers")
@Data
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Computer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "serial_number", unique = true, nullable = false)
    private String serialNumber;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String processor;

    @Column(name = "mac_lan")
    private String macLan;

    @Column(name = "mac_wifi")
    private String macWifi;

    @Column(name = "team_number", unique = true, nullable = false)
    private String teamNumber;

    @Column(name = "responsible_person")
    private String responsiblePerson;

    // Catálogos
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    private EquipmentType type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id")
    private EquipmentStatus status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    // Fechas de Gestión
    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "admission_date")
    private LocalDate admissionDate;

    @Column(name = "update_date")
    private LocalDate updateDate;

    @Column(name = "operating_system")
    private String operatingSystem;

    // Relaciones con Componentes (Bidireccional)
    @OneToMany(mappedBy = "computer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<RamMemory> ramMemories;

    @OneToMany(mappedBy = "computer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<StorageDevice> storageDevices;

    // Auditoría y Borrado Lógico
    @Column(name = "is_active")
    private boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (admissionDate == null)
            admissionDate = LocalDate.now();
        if (updateDate == null)
            updateDate = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        updateDate = LocalDate.now();
    }
}
