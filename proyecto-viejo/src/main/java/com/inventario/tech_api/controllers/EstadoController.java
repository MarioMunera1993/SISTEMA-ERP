package com.inventario.tech_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventario.tech_api.repositories.EstadoRepository;

import com.inventario.tech_api.models.Estado;
import java.util.List;

@RestController
@RequestMapping("/api/estados")
@CrossOrigin(origins = "*")

public class EstadoController {

    @Autowired
    private EstadoRepository estadoRepository;

    @GetMapping
    public List<Estado> listar() { return estadoRepository.findAll(); }

}
