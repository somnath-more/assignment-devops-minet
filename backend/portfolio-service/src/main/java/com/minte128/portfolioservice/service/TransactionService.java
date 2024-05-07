package com.minte128.portfolioservice.service;

import com.minte128.portfolioservice.dto.TransactionDto;
import com.minte128.portfolioservice.exception.InvalidAmountValueException;
import com.minte128.portfolioservice.exception.InvalidIDException;

import java.util.List;

public interface TransactionService {
    List<TransactionDto> getAllTransactionsByUser(Integer userId, String cryptoId);

    void addNewTransaction(TransactionDto transactionDto) throws InvalidIDException, InvalidAmountValueException;
}
