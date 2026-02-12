package com.inventario.tech_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventario.tech_api.repositories.TipoRepository;

import com.inventario.tech_api.models.Tipo;
import java.util.List;

@RestController
@RequestMapping("/api/tipos")
@CrossOrigin(origins = "*")

public class TipoController {

    @Autowired
    private TipoRepository tipoRepository;

    @GetMapping
    public List<Tipo> listar() { return tipoRepository.findAll(); }

}
