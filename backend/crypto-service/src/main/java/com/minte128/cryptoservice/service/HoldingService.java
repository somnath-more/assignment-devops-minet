package com.minte128.cryptoservice.service;


import com.minte128.cryptoservice.dto.HoldingDto;
import com.minte128.cryptoservice.exception.InvalidAmountValueException;
import com.minte128.cryptoservice.exception.InvalidIDException;

import java.util.List;

public interface HoldingService {
    List<HoldingDto> getAllCryptoHoldings(Integer userId, String cryptoId);

    void addCryptoHolding(HoldingDto cryptoHoldingDto) throws InvalidIDException, InvalidAmountValueException;

    HoldingDto getCryptoHoldingById(Integer cryptoHoldingId);

    void updateCryptoHolding(Integer cryptoHoldingId, HoldingDto cryptoHoldingDto) throws InvalidIDException;

    void deleteCryptoHolding(Integer cryptoHoldingId);
}
