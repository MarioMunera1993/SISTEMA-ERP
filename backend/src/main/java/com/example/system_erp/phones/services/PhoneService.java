package com.example.system_erp.phones.services;

import com.example.system_erp.phones.models.Phone;
import com.example.system_erp.phones.repositories.PhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PhoneService {

    @Autowired
    private PhoneRepository phoneRepository;

    public List<Phone> getAllActivePhones() {
        return phoneRepository.findByIsActiveTrue();
    }

    public Phone savePhone(Phone phone) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        phone.setModifiedBy(username);
        return phoneRepository.save(phone);
    }

    public Optional<Phone> getPhoneById(Long id) {
        if (id == null)
            return Optional.empty();
        return phoneRepository.findById(id);
    }

    public Phone updatePhone(Long id, Phone phoneDetails) {
        if (id == null)
            throw new IllegalArgumentException("El ID no puede ser nulo");
        Phone phone = phoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teléfono no encontrado con id: " + id));

        phone.setBrand(phoneDetails.getBrand());
        phone.setModel(phoneDetails.getModel());
        phone.setSerialNumber(phoneDetails.getSerialNumber());
        phone.setInventoryTag(phoneDetails.getInventoryTag());
        phone.setExtension(phoneDetails.getExtension());
        phone.setIpAddress(phoneDetails.getIpAddress());
        phone.setResponsiblePerson(phoneDetails.getResponsiblePerson());
        phone.setPurchaseDate(phoneDetails.getPurchaseDate());
        phone.setBranch(phoneDetails.getBranch());
        phone.setStatus(phoneDetails.getStatus());

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        phone.setModifiedBy(username);

        return phoneRepository.save(phone);
    }

    public void deletePhone(Long id) {
        if (id == null)
            throw new IllegalArgumentException("El ID no puede ser nulo");
        Phone phone = phoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teléfono no encontrado con id: " + id));
        phone.setActive(false);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        phone.setModifiedBy(username);
        phoneRepository.save(phone);
    }
}
