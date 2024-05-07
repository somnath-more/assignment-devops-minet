package com.minte128.portfolioservice.service.impl;

import com.minte128.portfolioservice.dto.TransactionDto;
import com.minte128.portfolioservice.entity.Transaction;
import com.minte128.portfolioservice.exception.InvalidAmountValueException;
import com.minte128.portfolioservice.exception.InvalidIDException;
import com.minte128.portfolioservice.exception.NotFoundAnyRecordsException;
import com.minte128.portfolioservice.repo.TransactionRepo;
import com.minte128.portfolioservice.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepo transactionRepo;

    private final ModelMapper modelMapper;

    @Autowired
    public TransactionServiceImpl(TransactionRepo transactionRepo, ModelMapper modelMapper){
        this.transactionRepo = transactionRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<TransactionDto> getAllTransactionsByUser(Integer userId, String cryptoId) {
        log.info("Started process to fetch all transactions..");
        List<Transaction> transactions;

        if(cryptoId != null) {
            log.info("Crypto Id filter applied on fetching transactions..");
            transactions = transactionRepo.findByUserIdAndCryptoId(userId, cryptoId);
        }else{
            transactions = transactionRepo.findByUserId(userId);
        }
        if(transactions == null || transactions.isEmpty()){
            return new ArrayList<>();
        }
        log.info("Completed process to fetch all transactions..");
        return transactions.stream()
                .map(this::convertEntityToDto)
                .toList();
    }

    @Override
    public void addNewTransaction(TransactionDto transactionDto) throws InvalidIDException, InvalidAmountValueException {
        log.info("Started process to add new transaction..");

        if(transactionDto.getCryptoId() == null || transactionDto.getCryptoId().isBlank()){
            throw new InvalidIDException("Kindly enter valid crypto id.");
        }
        if(transactionDto.getUserId() == null || transactionDto.getUserId() <=0){
            throw new InvalidIDException("Kindly enter valid user id.");
        }
        if(transactionDto.getQuantity() <=0 || transactionDto.getAmount() <=0){
            throw new InvalidAmountValueException("Kindly recheck your quantity or amount. Require greater then 0.");
        }
        Transaction transaction = convertDtoToEntity(transactionDto);
        transaction.setTransactionDate(LocalDate.now());

        transactionRepo.save(transaction);
        log.info("Completed process to add new transaction..");
    }

    private Transaction convertDtoToEntity(TransactionDto transactionDto){
        return modelMapper.map(transactionDto, Transaction.class);
    }

    private TransactionDto convertEntityToDto(Transaction transaction){
        return modelMapper.map(transaction, TransactionDto.class);
    }
}
