package com.minte128.cryptoservice.mapper;

import com.minte128.cryptoservice.dto.HoldingDto;
import com.minte128.cryptoservice.entity.CryptoHolding;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

public class HoldingMapper {

    private HoldingMapper() {
        throw new UnsupportedOperationException("This class cannot be instantiated.");
    }

    private static final ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
    }

    public static HoldingDto convertToDto(CryptoHolding cryptoHolding){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(cryptoHolding, HoldingDto.class);
    }

    public static CryptoHolding convertToEntity(HoldingDto holdingDto){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(holdingDto, CryptoHolding.class);
    }

}