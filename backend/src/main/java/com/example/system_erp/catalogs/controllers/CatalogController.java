package com.example.system_erp.catalogs.controllers;

import com.example.system_erp.catalogs.models.Branch;
import com.example.system_erp.catalogs.models.EquipmentStatus;
import com.example.system_erp.catalogs.models.EquipmentType;
import com.example.system_erp.catalogs.repositories.BranchRepository;
import com.example.system_erp.catalogs.repositories.EquipmentStatusRepository;
import com.example.system_erp.catalogs.repositories.EquipmentTypeRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/catalogs")
@CrossOrigin(origins = "*")
public class CatalogController {

    private final EquipmentTypeRepository typeRepository;
    private final EquipmentStatusRepository statusRepository;
    private final BranchRepository branchRepository;

    public CatalogController(EquipmentTypeRepository typeRepository,
            EquipmentStatusRepository statusRepository,
            BranchRepository branchRepository) {
        this.typeRepository = typeRepository;
        this.statusRepository = statusRepository;
        this.branchRepository = branchRepository;
    }

    @GetMapping("/types")
    public List<EquipmentType> getTypes() {
        return typeRepository.findAll();
    }

    @GetMapping("/statuses")
    public List<EquipmentStatus> getStatuses() {
        return statusRepository.findAll();
    }

    @GetMapping("/branches")
    public List<Branch> getBranches() {
        return branchRepository.findAll();
    }
}
