package com.minte128.portfolioservice.service;

import com.minte128.portfolioservice.constants.TransactionStatus;
import com.minte128.portfolioservice.constants.TransactionType;
import com.minte128.portfolioservice.dto.TransactionDto;
import com.minte128.portfolioservice.entity.Transaction;
import com.minte128.portfolioservice.exception.InvalidAmountValueException;
import com.minte128.portfolioservice.exception.InvalidIDException;
import com.minte128.portfolioservice.exception.NotFoundAnyRecordsException;
import com.minte128.portfolioservice.repo.TransactionRepo;
import com.minte128.portfolioservice.service.impl.TransactionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import java.util.stream.Stream;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;


class TransactionServiceImplTest {

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @Mock
    private TransactionRepo transactionRepo;

    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTransactionsByUser_success() throws NotFoundAnyRecordsException {
        Integer userId = 1;
        String cryptoId = "2";
        List<Transaction> mockTransactions = new ArrayList<>();
        mockTransactions.add(mockTransaction(userId, cryptoId));

        when(transactionRepo.findByUserIdAndCryptoId(userId, cryptoId)).thenReturn(mockTransactions);
        List<TransactionDto> result = transactionService.getAllTransactionsByUser(userId, cryptoId);
        assertNotNull(result);
    }

    @Test
    void testGetAllTransactionsByUser_nullCrypto_withoutCryptoFilter_success() throws NotFoundAnyRecordsException {
        Integer userId = 1;
        List<Transaction> mockTransactions = new ArrayList<>();
        mockTransactions.add(mockTransaction(userId, null));

        when(transactionRepo.findByUserId(userId)).thenReturn(mockTransactions);
        List<TransactionDto> result = transactionService.getAllTransactionsByUser(userId, null);
        assertNotNull(result);
    }

    @Test
    void testGetAllTransactionsByUser_cryptoAs0_withoutCryptoFilter_success() throws NotFoundAnyRecordsException {
        Integer userId = 1;
        List<Transaction> mockTransactions = new ArrayList<>();
        mockTransactions.add(mockTransaction(userId, null));

        when(transactionRepo.findByUserId(userId)).thenReturn(mockTransactions);
        List<TransactionDto> result = transactionService.getAllTransactionsByUser(userId, null);
        assertNotNull(result);
    }

    @Test
    void testGetAllTransactionsByUser_emptyResult_exception() throws NotFoundAnyRecordsException {
        Integer userId = 1;
        String cryptoId = "2";
        List<Transaction> mockTransactions = new ArrayList<>();

        when(transactionRepo.findByUserIdAndCryptoId(userId, cryptoId)).thenReturn(mockTransactions);
        List<TransactionDto> result = transactionService.getAllTransactionsByUser(userId, cryptoId);
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetAllTransactionsByUser_nullResult_exception() throws NotFoundAnyRecordsException {
        Integer userId = 1;
        String cryptoId = "2";

        when(transactionRepo.findByUserIdAndCryptoId(userId, cryptoId)).thenReturn(null);
        List<TransactionDto> result = transactionService.getAllTransactionsByUser(userId, cryptoId);
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testAddNewTransaction_success() throws InvalidIDException, InvalidAmountValueException {
        TransactionDto transactionDto = mockTransactionDto(1 ,"2", 10, 100.0);

        Transaction mockTransaction = new Transaction();
        when(modelMapper.map(transactionDto, Transaction.class)).thenReturn(mockTransaction);
        when(transactionRepo.save(any(Transaction.class))).thenReturn(mockTransaction);

        assertDoesNotThrow(() -> transactionService.addNewTransaction(transactionDto));
    }

    @Test
    void testAddNewTransaction_nullUser_exception() throws InvalidIDException, InvalidAmountValueException {
        TransactionDto transactionDto = mockTransactionDto(null ,"2", 10, 100.0);
        Transaction mockTransaction = new Transaction();

        assertThrows(InvalidIDException.class, () -> {
            transactionService.addNewTransaction(transactionDto);
        });
    }

    @ParameterizedTest
    @MethodSource("invalidTransactionData")
    void testAddNewTransaction_invalidData_exception(TransactionDto transactionDto) {
        assertThrows(InvalidIDException.class, () -> {
            transactionService.addNewTransaction(transactionDto);
        });
    }

    @Test
    void testAddNewTransaction_quantityWithZeroValue_exception() throws InvalidIDException, InvalidAmountValueException {
        TransactionDto transactionDto = mockTransactionDto(1 ,"2", 0, 100.0);
        Transaction mockTransaction = new Transaction();

        assertThrows(InvalidAmountValueException.class, () -> {
            transactionService.addNewTransaction(transactionDto);
        });
    }

    @Test
    void testAddNewTransaction_amountWithZeroValue_exception() throws InvalidIDException, InvalidAmountValueException {
        TransactionDto transactionDto = mockTransactionDto(1 ,"2", 10, 0);
        Transaction mockTransaction = new Transaction();

        assertThrows(InvalidAmountValueException.class, () -> {
            transactionService.addNewTransaction(transactionDto);
        });
    }

    private Transaction mockTransaction(Integer userId, String cryptoId){
        Transaction transaction = new Transaction();
        transaction.setUserId(userId);
        transaction.setCryptoId(cryptoId);
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setTransactionType(TransactionType.PURCHASED);
        transaction.setQuantity(5);
        transaction.setAmount(50000);
        transaction.setCoinName("Bitcoin");
        transaction.setReceiverName("xyz");

        return transaction;
    }

    private static TransactionDto mockTransactionDto(Integer userId, String cryptoId, int quantity, double amount) {
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setCryptoId(cryptoId);
        transactionDto.setUserId(userId);
        transactionDto.setAmount(amount);
        transactionDto.setQuantity(quantity);

        return transactionDto;
    }

    public static Stream<TransactionDto> invalidTransactionData() {
        return Stream.of(
                mockTransactionDto(0, "2", 10, 100.0),
                mockTransactionDto(1, null, 10, 100.0),
                mockTransactionDto(1, "", 10, 100.0)
        );
    }
}

