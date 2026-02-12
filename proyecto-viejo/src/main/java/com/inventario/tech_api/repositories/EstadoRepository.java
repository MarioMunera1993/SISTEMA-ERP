package com.inventario.tech_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventario.tech_api.models.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Integer> {

}
