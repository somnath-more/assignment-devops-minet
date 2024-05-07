package com.minte128.cryptoservice.service;

import com.minte128.cryptoservice.dto.WatchlistDto;
import com.minte128.cryptoservice.entity.Crypto;
import com.minte128.cryptoservice.entity.Watchlist;
import com.minte128.cryptoservice.exception.WatchlistNotFoundException;
import com.minte128.cryptoservice.exception.WatchlistSaveException;
import com.minte128.cryptoservice.mapper.WatchlistMapper;
import com.minte128.cryptoservice.repository.CryptoRepository;
import com.minte128.cryptoservice.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WatchlistServiceImpl implements WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private CryptoRepository cryptoRepository;

    @Override
    public WatchlistDto getWatchListByUserIdAndCryptoId(Integer userId, String cryptoId) {
        Watchlist watchlist = watchlistRepository.getWatchListByUserIdAndCryptoId(userId, cryptoId);
        if (watchlist == null) {
            return null;
        }
        return WatchlistMapper.convertToDto(watchlist);
    }

    @Override
    public List<WatchlistDto> getByUserId(Integer userId) {
        try{
            List<Watchlist> watchlistList = watchlistRepository.getByUserId(userId);
            return watchlistList.stream().map(WatchlistMapper::convertToDto).collect(Collectors.toList());
        }catch (Exception e){
            throw new WatchlistNotFoundException("error not found watchlist");
        }
    }

    @Override
    public WatchlistDto postToWatchlist(WatchlistDto watchlistDto) {
        try{
            Watchlist watchlist = WatchlistMapper.convertToEntity(watchlistDto);
            Optional<Crypto> crypto = cryptoRepository.findById(watchlistDto.getCryptoId());
            if(crypto.isPresent()){
                watchlist.setCrypto(crypto.get());
            }
            Watchlist savedWatchlist = watchlistRepository.save(watchlist);
            return WatchlistMapper.convertToDto(savedWatchlist);
        }catch (Exception e){
            throw new WatchlistSaveException("Error posting watchlist item");
        }
    }
    @Override
    public void deleteWatchListItem(Integer id) {
        try {
            watchlistRepository.deleteById(id);
        } catch (Exception e) {
            throw new WatchlistSaveException("Error deleting watchlist item: " + e.getMessage());
        }
    }
}

