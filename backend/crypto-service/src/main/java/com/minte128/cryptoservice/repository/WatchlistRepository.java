package com.minte128.cryptoservice.repository;

import com.minte128.cryptoservice.dto.WatchlistDto;
import com.minte128.cryptoservice.entity.Watchlist;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchlistRepository extends JpaRepository<Watchlist , Integer> {
    Watchlist getWatchListByUserIdAndCryptoId(Integer userid, String cryptoId);
    List<Watchlist> getByUserId(Integer userId);
}
