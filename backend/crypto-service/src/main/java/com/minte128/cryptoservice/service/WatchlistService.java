package com.minte128.cryptoservice.service;

import com.minte128.cryptoservice.dto.WatchlistDto;

import java.util.List;

public interface WatchlistService {
    WatchlistDto getWatchListByUserIdAndCryptoId(Integer userid,String cryptoId);
    List<WatchlistDto> getByUserId(Integer userId);

    WatchlistDto postToWatchlist(WatchlistDto watchlistDto);
    void deleteWatchListItem(Integer id);
}
