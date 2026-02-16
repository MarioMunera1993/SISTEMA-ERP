package com.example.system_erp.phones.models;

import com.example.system_erp.catalogs.models.Branch;
import com.example.system_erp.catalogs.models.EquipmentStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "phones")
@Data
public class Phone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(name = "serial_number", unique = true, nullable = false)
    private String serialNumber;

    @Column(name = "inventory_tag", unique = true, nullable = false)
    private String inventoryTag;

    private String extension;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "responsible_person")
    private String responsiblePerson;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "admission_date", updatable = false)
    private LocalDateTime admissionDate;

    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @Column(name = "is_active")
    private boolean isActive = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id")
    private EquipmentStatus status;

    @PrePersist
    protected void onCreate() {
        admissionDate = LocalDateTime.now();
        updateDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updateDate = LocalDateTime.now();
    }
}
