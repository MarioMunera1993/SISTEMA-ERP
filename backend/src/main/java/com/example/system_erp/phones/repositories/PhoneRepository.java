package com.example.system_erp.phones.repositories;

import com.example.system_erp.phones.models.Phone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PhoneRepository extends JpaRepository<Phone, Long> {
    List<Phone> findByIsActiveTrue();
}
