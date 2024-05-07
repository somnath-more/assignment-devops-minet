package com.minte128.cryptoservice.mapper;

import com.minte128.cryptoservice.dto.WatchlistDto;
import com.minte128.cryptoservice.entity.Crypto;
import com.minte128.cryptoservice.entity.Watchlist;

public class WatchlistMapper {

    public static WatchlistDto convertToDto(Watchlist watchlist) {
        WatchlistDto watchlistDto = new WatchlistDto();
        watchlistDto.setId(watchlist.getId());
        watchlistDto.setUserId(watchlist.getUserId());
        if (watchlist.getCrypto() != null) {
            watchlistDto.setCryptoId(watchlist.getCrypto().getId());
        }
        return watchlistDto;
    }

    public static Watchlist convertToEntity(WatchlistDto watchlistDto) {
        Watchlist watchlist = new Watchlist();
        watchlist.setId(watchlistDto.getId());
        watchlist.setUserId(watchlistDto.getUserId());
        Crypto crypto = new Crypto();
        crypto.setId(watchlistDto.getCryptoId());
        watchlist.setCrypto(crypto);
        return watchlist;
    }
}
