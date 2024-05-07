package com.minte128.cryptoservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HoldingDto {
    private Integer id;
    private double amount;
    private Integer userId;
    private double quantity;
    private CryptoDto crypto;
}
