package com.inventario.tech_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventario.tech_api.models.Tipo;

public interface TipoRepository extends JpaRepository<Tipo, Integer>  {

}
