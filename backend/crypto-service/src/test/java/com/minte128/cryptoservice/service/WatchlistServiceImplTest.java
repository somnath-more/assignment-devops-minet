package com.minte128.cryptoservice.service;
import com.minte128.cryptoservice.dto.WatchlistDto;
import com.minte128.cryptoservice.entity.Watchlist;
import com.minte128.cryptoservice.exception.WatchlistNotFoundException;
import com.minte128.cryptoservice.exception.WatchlistSaveException;
import com.minte128.cryptoservice.mapper.WatchlistMapper;
import com.minte128.cryptoservice.repository.WatchlistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;


class WatchlistServiceImplTest {

    @InjectMocks
    private WatchlistServiceImpl watchlistService;

    @Mock
    private WatchlistRepository watchlistRepository;

    @BeforeEach
     void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
     void testGetWatchListByUserIdAndCryptoId() {
        Watchlist watchlist = new Watchlist();
        watchlist.setId(1);
        watchlist.setUserId(1);

        Mockito.when(watchlistRepository.getWatchListByUserIdAndCryptoId(1, "BTC")).thenReturn(watchlist);

        WatchlistDto watchlistDto = WatchlistMapper.convertToDto(watchlist);

        WatchlistDto watchlistDto1 = watchlistService.getWatchListByUserIdAndCryptoId(1, "BTC");

        assertEquals(watchlistDto.getId(), watchlistDto1.getId());
        assertEquals(watchlistDto.getUserId(), watchlistDto1.getUserId());
        assertEquals(watchlistDto.getCryptoId(), watchlistDto1.getCryptoId());
    }
    @Test
     void testGetByUserId() {
        List<Watchlist> watchlistList = new ArrayList<>();
        Mockito.when(watchlistRepository.getByUserId(1)).thenReturn(watchlistList);

        List<WatchlistDto> watchlistDtoList = watchlistService.getByUserId(1);

        assertEquals(watchlistList.size(), watchlistDtoList.size());
    }

    @Test
    void testPostToWatchlist() {
        WatchlistDto watchlistDto = new WatchlistDto();
        watchlistDto.setId(1);
        watchlistDto.setUserId(1);
        watchlistDto.setCryptoId("BTC");

        Watchlist watchlist = WatchlistMapper.convertToEntity(watchlistDto);

        Mockito.when(watchlistRepository.save(watchlist)).thenReturn(watchlist);

        WatchlistDto savedWatchlistDto = watchlistService.postToWatchlist(watchlistDto);

        assertEquals(watchlistDto, savedWatchlistDto);
    }

    @Test
     void testDeleteWatchListItem() {

        Mockito.when(watchlistRepository.findById(1)).thenReturn(Optional.of(new Watchlist()));

        watchlistService.deleteWatchListItem(1);

        Mockito.verify(watchlistRepository).deleteById(1);
    }

    @Test
     void testGetWatchListByUserIdAndCryptoId_NotFound() {
        Mockito.when(watchlistRepository.getWatchListByUserIdAndCryptoId(1, "BTC")).thenReturn(null);

        assertThrows(WatchlistNotFoundException.class, () -> watchlistService.getWatchListByUserIdAndCryptoId(1, "BTC"));
    }

    @Test
    void testPostToWatchlist_SaveError() {
        WatchlistDto watchlistDto = new WatchlistDto();
        watchlistDto.setId(1);
        watchlistDto.setUserId(1);
        watchlistDto.setCryptoId("BTC");

        Watchlist watchlist = WatchlistMapper.convertToEntity(watchlistDto);

       Mockito.when(watchlistRepository.save(watchlist)).thenReturn(null);

        assertThrows(WatchlistSaveException.class, () -> watchlistService.postToWatchlist(watchlistDto));
    }


    @Test
    void testDeleteWatchListItem_DeleteError() {
        int itemId = 1;
        Mockito.when(watchlistRepository.findById(itemId)).thenReturn(Optional.of(new Watchlist()));
        assertDoesNotThrow(() -> watchlistService.deleteWatchListItem(itemId));
    }

}