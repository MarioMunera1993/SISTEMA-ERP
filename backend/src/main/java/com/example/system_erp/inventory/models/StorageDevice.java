package com.example.system_erp.inventory.models;

import com.example.system_erp.computers.models.Computer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "storage_devices")
@Data
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class StorageDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String capacity; // Ejemplo: "500GB", "1TB"

    @Column(nullable = false)
    private String type; // Ejemplo: "SSD", "HDD", "NVMe"

    @Column(length = 500)
    private String observations;

    @Column(name = "serial_number", unique = true)
    private String serialNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "computer_id")
    @JsonIgnore
    private Computer computer;

    @com.fasterxml.jackson.annotation.JsonProperty("computerId")
    public Long getComputerId() {
        return computer != null ? computer.getId() : null;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("teamNumber")
    public String getTeamNumber() {
        return (computer != null) ? computer.getTeamNumber() : null;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("componentStatus")
    public String getComponentStatus() {
        if (computer == null)
            return "EN BODEGA";
        return (computer.getStatus() != null) ? computer.getStatus().getName().toUpperCase() : "SIN ESTADO";
    }

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
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
