package com.minte128.portfolioservice.dto;

import com.minte128.portfolioservice.constants.TransactionStatus;
import com.minte128.portfolioservice.constants.TransactionType;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class TransactionDto {

    private Integer id;

    private double amount;

    private double quantity;

    private TransactionType transactionType;

    private TransactionStatus transactionStatus;

    private String coinName;

    private LocalDate transactionDate;

    private String receiverName;

    private Integer userId;

    private String cryptoId;
}
