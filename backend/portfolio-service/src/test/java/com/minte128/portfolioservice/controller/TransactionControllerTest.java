package com.minte128.portfolioservice.controller;

import com.minte128.portfolioservice.dto.TransactionDto;
import com.minte128.portfolioservice.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class TransactionControllerTest {

    @InjectMocks
    private TransactionController transactionController;

    @Mock
    private TransactionService transactionService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTransactionsByUser_success() {
        Integer userId = 1;
        String cryptoId = "2";
        List<TransactionDto> mockTransactions = new ArrayList<>();

        when(transactionService.getAllTransactionsByUser(userId, cryptoId)).thenReturn(mockTransactions);
        List<TransactionDto> result = transactionController.getAllTransactionsByUser(userId, cryptoId);
        assertNotNull(result);
    }

    @Test
    void testGetAllTransactionsByUser_noCryptoFilter_success() {
        Integer userId = 1;
        List<TransactionDto> mockTransactions = new ArrayList<>();

        when(transactionService.getAllTransactionsByUser(userId, null)).thenReturn(mockTransactions);
        List<TransactionDto> result = transactionController.getAllTransactionsByUser(userId, null);
        assertNotNull(result);
    }

    @Test
    void testAddNewTransaction_success() {
        TransactionDto transactionDto = new TransactionDto();
        assertDoesNotThrow(() -> {
            transactionController.addNewTransaction(transactionDto);
        });
    }
}

