package com.example.system_erp.computers.repositories;

import com.example.system_erp.computers.models.Computer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComputerRepository extends JpaRepository<Computer, Long> {
    List<Computer> findByIsActiveTrue();
}
