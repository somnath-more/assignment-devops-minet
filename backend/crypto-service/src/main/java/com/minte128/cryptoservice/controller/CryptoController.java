package com.minte128.cryptoservice.controller;

import com.minte128.cryptoservice.dto.CryptoDto;
import com.minte128.cryptoservice.service.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cryptos")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH}, allowedHeaders = "*", exposedHeaders = "Access-Control-Allow-Origin")
public class CryptoController {
    @Autowired
    private CryptoService cryptoService;

    @GetMapping
    public ResponseEntity<List<CryptoDto>> getAllCoins(){
       return new ResponseEntity<>(cryptoService.getAllCryptos(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CryptoDto> getCryptoById(@PathVariable String id){
        return new ResponseEntity<>(cryptoService.getCryptoById(id),HttpStatus.OK);
    }
}
