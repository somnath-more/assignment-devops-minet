package com.minte128.cryptoservice.service;

import com.minte128.cryptoservice.dto.CryptoDto;

import java.util.List;

public interface CryptoService {
    List<CryptoDto> getAllCryptos();
    CryptoDto getCryptoById(String id);
}
