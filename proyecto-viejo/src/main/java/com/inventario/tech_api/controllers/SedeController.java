package com.inventario.tech_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventario.tech_api.repositories.SedeRepository;

import com.inventario.tech_api.models.Sede;
import java.util.List;

@RestController
@RequestMapping("/api/sedes")
@CrossOrigin(origins = "*")

public class SedeController {

    @Autowired
    private SedeRepository sedeRepository;

    @GetMapping
    public List<Sede> listar() { return sedeRepository.findAll(); }

}
