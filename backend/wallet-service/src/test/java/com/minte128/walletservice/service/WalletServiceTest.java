package com.minte128.walletservice.service;

import com.minte128.walletservice.dto.WalletDto;
import com.minte128.walletservice.entity.Wallet;
import com.minte128.walletservice.exception.NotFoundException;
import com.minte128.walletservice.mapper.WalletMapper;
import com.minte128.walletservice.repository.WalletRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

class WalletServiceTest {

    @InjectMocks
    private WalletServiceImpl walletService;

    @Mock
    private WalletRepository walletRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindByUserId_existingUser_shouldReturnWalletDto() {
        int userId = 1;
        Wallet wallet = new Wallet();
        wallet.setId(1);
        wallet.setAmount(100.0);
        wallet.setUserId(userId);

        when(walletRepository.findByUserId(userId)).thenReturn(wallet);

        WalletDto result = walletService.findByUserId(userId);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(wallet.getId(), result.getId());
        Assertions.assertEquals(wallet.getAmount(), result.getAmount(), 0.001);
        Assertions.assertEquals(wallet.getUserId(), result.getUserId());
    }

    @Test
    void testFindByUserId_nonExistingUser_shouldThrowNotFoundException() {
        int userId = 2;

        when(walletRepository.findByUserId(userId)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> walletService.findByUserId(userId));
    }

    @Test
    void testSaveWalletDetails_validWalletDto_shouldReturnSavedWalletDto() {
        WalletDto walletDto = new WalletDto();
        walletDto.setAmount(200.0);
        walletDto.setUserId(1);

        Wallet wallet = WalletMapper.convertToEntity(walletDto);
        wallet.setId(1);

        when(walletRepository.save(any(Wallet.class))).thenReturn(wallet);

        WalletDto result = walletService.saveWalletDetails(walletDto);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(wallet.getId(), result.getId());
        Assertions.assertEquals(wallet.getAmount(), result.getAmount(), 200.0);
        Assertions.assertEquals(wallet.getUserId(), result.getUserId());
    }
  
    @Test
    void testUpdateWalletDetails_existingWallet_shouldReturnUpdatedWalletDto() {
        int walletId = 1;

        Wallet existingWallet = new Wallet();
        existingWallet.setId(walletId);
        existingWallet.setAmount(100.0);
        existingWallet.setUserId(1);

        WalletDto updatedWalletDto = new WalletDto();
        updatedWalletDto.setAmount(200.0);
        updatedWalletDto.setUserId(1);

        when(walletRepository.findById(walletId)).thenReturn(java.util.Optional.of(existingWallet));
        when(walletRepository.save(any(Wallet.class))).thenAnswer(invocation -> {
            Wallet savedWallet = invocation.getArgument(0);
            // Simulate the behavior of saving the wallet in the database
            savedWallet.setId(walletId);
            return savedWallet;
        });

        WalletDto result = walletService.updateWalletDetails(walletId, updatedWalletDto);

        assertEquals(existingWallet.getId(), result.getId());
        assertEquals(updatedWalletDto.getAmount(), result.getAmount(), 0.001);
        assertEquals(updatedWalletDto.getUserId(), result.getUserId());

        Mockito.verify(walletRepository).findById(walletId);
        Mockito.verify(walletRepository).save(existingWallet);
    }


    @Test
    void testUpdateWalletDetails_nonExistingWallet_shouldThrowNotFoundException() {
        int nonExistingWalletId = 2;

        when(walletRepository.findById(nonExistingWalletId)).thenReturn(java.util.Optional.empty());
        assertThrows(NotFoundException.class, () -> walletService.updateWalletDetails(nonExistingWalletId, new WalletDto()));
    }

}
