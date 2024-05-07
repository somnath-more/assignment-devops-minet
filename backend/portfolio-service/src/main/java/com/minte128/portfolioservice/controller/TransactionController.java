package com.minte128.portfolioservice.controller;

import com.minte128.portfolioservice.dto.TransactionDto;
import com.minte128.portfolioservice.exception.InvalidAmountValueException;
import com.minte128.portfolioservice.exception.InvalidIDException;
import com.minte128.portfolioservice.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transactions")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH}, allowedHeaders = "*", exposedHeaders = "Access-Control-Allow-Origin")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
         this.transactionService = transactionService;
    }

    @GetMapping("/users/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<TransactionDto> getAllTransactionsByUser(
            @PathVariable Integer userId,
            @RequestParam(name = "cryptoId", required = false) String cryptoId) {
        return transactionService.getAllTransactionsByUser(userId, cryptoId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addNewTransaction(@RequestBody TransactionDto transactionDto)
            throws InvalidIDException, InvalidAmountValueException {
        transactionService.addNewTransaction(transactionDto);
    }
}
