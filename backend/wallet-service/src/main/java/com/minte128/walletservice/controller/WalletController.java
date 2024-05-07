package com.minte128.walletservice.controller;

import com.minte128.walletservice.dto.WalletDto;
import com.minte128.walletservice.service.WalletService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/wallets")
@Validated
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH}, allowedHeaders = "*", exposedHeaders = "Access-Control-Allow-Origin")
public class WalletController {
    @Autowired
    private WalletService walletService;

    @GetMapping
    public ResponseEntity<WalletDto> getWalletDetailsById(@RequestParam("userId") int userId) {
        return new ResponseEntity<>(walletService.findByUserId(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WalletDto> saveWalletDetails(@Valid @RequestBody WalletDto walletDto) {
        return new ResponseEntity<>(walletService.saveWalletDetails(walletDto), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<WalletDto> updateWalletDetails(@PathVariable int id, @Valid @RequestBody WalletDto walletDto) {
        return new ResponseEntity<>(walletService.updateWalletDetails(id,walletDto), HttpStatus.OK);
    }

}
