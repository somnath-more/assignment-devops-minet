package com.minte128.cryptoservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "holding")
public class CryptoHolding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private double amount;

    @Column
    private Integer userId;

    @Column
    private double quantity;

    @ManyToOne
    @JoinColumn(name = "crypto_id")
    private Crypto crypto;
}
