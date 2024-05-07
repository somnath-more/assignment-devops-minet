package com.minte128.cryptoservice.repository;

import com.minte128.cryptoservice.entity.CryptoHolding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HoldingRepository extends JpaRepository<CryptoHolding, Integer> {

    List<CryptoHolding> findByCryptoId(String cryptoId);

    List<CryptoHolding> findByUserId(Integer userId);

    List<CryptoHolding> findByUserIdAndCryptoId(Integer userId, String cryptoId);
}

