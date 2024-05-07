package com.minte128.portfolioservice.repo;

import com.minte128.portfolioservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Integer> {

    List<Transaction> findByUserIdAndCryptoId(Integer userId, String cryptoId);

    List<Transaction> findByUserId(Integer userId);
}
