package com.minte128.portfolioservice.entity;

import com.minte128.portfolioservice.constants.TransactionStatus;
import com.minte128.portfolioservice.constants.TransactionType;
import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "transaction")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    @Min(value = 1, message = "Quantity must be greater than 0")
    private double amount;

    @Column
    private double quantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType transactionType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus transactionStatus;

    @Column
    private String coinName;

    @Column
    private LocalDate transactionDate;

    @Column
    private String receiverName;

    @Column
    @NotNull(message = "UserId must not be null.")
    private Integer userId;

    @Column
    @NotNull(message = "CryptoId must not be null.")
    private String cryptoId;
}
