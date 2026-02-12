package com.example.system_erp.catalogs.repositories;

import com.example.system_erp.catalogs.models.EquipmentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipmentTypeRepository extends JpaRepository<EquipmentType, Integer> {
}
