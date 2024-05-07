package com.minte128.walletservice.service;

import com.minte128.walletservice.dto.WalletDto;

public interface WalletService {
    WalletDto findByUserId(int userId);

    WalletDto saveWalletDetails(WalletDto walletDto);
    WalletDto updateWalletDetails(int id ,WalletDto walletDto);
}
