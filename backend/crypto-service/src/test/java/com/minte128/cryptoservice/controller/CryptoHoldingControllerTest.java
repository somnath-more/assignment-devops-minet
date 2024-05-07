package com.minte128.cryptoservice.controller;

import com.minte128.cryptoservice.dto.HoldingDto;
import com.minte128.cryptoservice.service.HoldingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class CryptoHoldingControllerTest {

    @InjectMocks
    private HoldingController cryptoHoldingController;

    @Mock
    private HoldingService cryptoHoldingService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllCryptoHoldings_success() {
        Integer userId = 1;
        String cryptoId = "bitcoin";
        List<HoldingDto> mockCryptoHoldings = new ArrayList<>();

        when(cryptoHoldingService.getAllCryptoHoldings(userId, cryptoId)).thenReturn(mockCryptoHoldings);

        List<HoldingDto> result = cryptoHoldingController.getAllCryptoHoldings(userId, cryptoId);
        assertNotNull(result);
    }

    @Test
    void testGetAllCryptoHoldings_noCryptoFilter_success() {
        Integer userId = 1;
        List<HoldingDto> mockCryptoHoldings = new ArrayList<>();

        when(cryptoHoldingService.getAllCryptoHoldings(userId, null)).thenReturn(mockCryptoHoldings);

        List<HoldingDto> result = cryptoHoldingController.getAllCryptoHoldings(userId, null);
        assertNotNull(result);
    }

    @Test
    void testGetCryptoHoldingById_success() {
        Integer cryptoHoldingId = 1;
        HoldingDto mockCryptoHolding = new HoldingDto();
        mockCryptoHolding.setId(cryptoHoldingId);

        when(cryptoHoldingService.getCryptoHoldingById(cryptoHoldingId)).thenReturn(mockCryptoHolding);

        HoldingDto result = cryptoHoldingController.getCryptoHoldingById(cryptoHoldingId);
        assertNotNull(result);
        assertEquals(cryptoHoldingId, result.getId());
    }

    @Test
    void testAddCryptoHolding_success() {
        HoldingDto cryptoHoldingDto = new HoldingDto();
        cryptoHoldingDto.setUserId(1);

        assertDoesNotThrow(() -> {
            cryptoHoldingController.addCryptoHolding(cryptoHoldingDto);
        });
    }

    @Test
    void testUpdateCryptoHolding_success() {
        Integer cryptoHoldingId = 1;
        HoldingDto cryptoHoldingDto = new HoldingDto();
        cryptoHoldingDto.setId(cryptoHoldingId);
        assertDoesNotThrow(() -> {
            cryptoHoldingController.updateCryptoHolding(cryptoHoldingId, cryptoHoldingDto);
        });
    }
}
