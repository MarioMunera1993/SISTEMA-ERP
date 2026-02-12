package com.inventario.tech_api.repositories;

import com.inventario.tech_api.models.Impresora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Le indica a Spring que este es un componente de acceso a datos
public interface ImpresoraRepository extends JpaRepository<Impresora, Long> {

    boolean existsByNumeroSerie(String serie);
    boolean existsByNumeroImpresora(String numero);

}
