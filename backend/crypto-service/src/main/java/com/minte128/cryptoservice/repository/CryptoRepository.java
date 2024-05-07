package com.minte128.cryptoservice.repository;

import com.minte128.cryptoservice.entity.Crypto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CryptoRepository extends JpaRepository<Crypto,String> {
}
