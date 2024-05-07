package com.minte128.cryptoservice.controller;

import com.minte128.cryptoservice.dto.HoldingDto;
import com.minte128.cryptoservice.exception.InvalidAmountValueException;
import com.minte128.cryptoservice.exception.InvalidIDException;
import com.minte128.cryptoservice.service.HoldingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/holdings")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH}, allowedHeaders = "*", exposedHeaders = "Access-Control-Allow-Origin")
public class HoldingController {

    @Autowired
    private HoldingService holdingService;

    @GetMapping("/users/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<HoldingDto> getAllCryptoHoldings(@PathVariable Integer userId, @RequestParam(name = "cryptoId", required = false) String cryptoId) {
        return holdingService.getAllCryptoHoldings(userId, cryptoId);
    }

    @GetMapping("/{cryptoHoldingId}")
    @ResponseStatus(HttpStatus.OK)
    public HoldingDto getCryptoHoldingById(@PathVariable Integer cryptoHoldingId) {
        return holdingService.getCryptoHoldingById(cryptoHoldingId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addCryptoHolding(@RequestBody HoldingDto cryptoHoldingDto) throws InvalidAmountValueException, InvalidIDException {
        holdingService.addCryptoHolding(cryptoHoldingDto);
    }

    @PatchMapping("/{cryptoHoldingId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateCryptoHolding(@PathVariable Integer cryptoHoldingId, @RequestBody HoldingDto cryptoHoldingDto) throws InvalidIDException {
        holdingService.updateCryptoHolding(cryptoHoldingId, cryptoHoldingDto);
    }

    @DeleteMapping("/{cryptoHoldingId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCryptoHolding(@PathVariable Integer cryptoHoldingId) {
        holdingService.deleteCryptoHolding(cryptoHoldingId);
    }
}

