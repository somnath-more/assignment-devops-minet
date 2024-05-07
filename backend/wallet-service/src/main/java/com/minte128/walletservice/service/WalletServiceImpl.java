package com.minte128.walletservice.service;

import com.minte128.walletservice.dto.WalletDto;
import com.minte128.walletservice.entity.Wallet;
import com.minte128.walletservice.exception.NotFoundException;
import com.minte128.walletservice.mapper.WalletMapper;
import com.minte128.walletservice.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Override
    public WalletDto findByUserId(int userId) {
        Wallet wallet = walletRepository.findByUserId(userId);

        if (wallet == null) {
            throw new NotFoundException("Wallet not found with user id: " + userId);
        }
        return WalletMapper.convertToDto(wallet);
    }

    @Override
    public WalletDto saveWalletDetails(WalletDto walletDto) {
        Wallet saveWallet = WalletMapper.convertToEntity(walletDto);
        saveWallet = walletRepository.save(saveWallet);
        return WalletMapper.convertToDto(saveWallet);
    }

    @Override
    public WalletDto updateWalletDetails(int id, WalletDto walletDto) {
        Wallet existingWallet = walletRepository.findById(id).orElseThrow(() -> new NotFoundException("Wallet details not found with id: " + id));
        existingWallet.setAmount(walletDto.getAmount());
        Wallet updatedWallet = walletRepository.save(existingWallet);
        return WalletMapper.convertToDto(updatedWallet);
    }

}
