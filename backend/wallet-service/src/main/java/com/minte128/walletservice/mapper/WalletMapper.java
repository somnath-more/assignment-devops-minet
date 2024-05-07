package com.minte128.walletservice.mapper;

import com.minte128.walletservice.dto.WalletDto;
import com.minte128.walletservice.entity.Wallet;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

public class WalletMapper {

    @Autowired
    private static final ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
    }

    public static Wallet convertToEntity(WalletDto walletDto) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(walletDto, Wallet.class);
    }

    public static WalletDto convertToDto(Wallet wallet) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(wallet, WalletDto.class);
    }
}
