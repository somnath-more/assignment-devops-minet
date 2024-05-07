package com.minte128.cryptoservice.controller;

import com.minte128.cryptoservice.dto.WatchlistDto;
import com.minte128.cryptoservice.service.WatchlistService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WatchListControllerTest {

    @InjectMocks
    private WatchListController watchListController;

    @Mock
    private WatchlistService watchlistService;

    @BeforeEach
     void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
     void testGetWatchListByUserIdAndCryptoId() {
        WatchlistDto watchlistDto = new WatchlistDto();
        watchlistDto.setId(1);
        watchlistDto.setUserId(1);
        watchlistDto.setCryptoId("BTC");

        Mockito.when(watchlistService.getWatchListByUserIdAndCryptoId(1, "BTC")).thenReturn(watchlistDto);

        ResponseEntity<WatchlistDto> response = watchListController.getWatchListByUserIdAndCryptoId(1, "BTC");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(watchlistDto, response.getBody());
    }

    @Test
    void testGetByUserId() {
        List<WatchlistDto> watchlistDtoList = new ArrayList<>();

        Mockito.when(watchlistService.getByUserId(1)).thenReturn(watchlistDtoList);

        ResponseEntity<List<WatchlistDto> > response = watchListController.getByUserId(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(watchlistDtoList, response.getBody());
    }

    @Test
    void testPostToWatchlist() {
        WatchlistDto watchlistDto = new WatchlistDto();
        watchlistDto.setId(1);
        watchlistDto.setUserId(1);
        watchlistDto.setCryptoId("BTC");

        Mockito.when(watchlistService.postToWatchlist(watchlistDto)).thenReturn(watchlistDto);

        ResponseEntity<WatchlistDto> response = watchListController.postToWatchlist(watchlistDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(watchlistDto, response.getBody());
    }

    @Test
    void testDeleteWatchListItem() {

        Mockito.doNothing().when(watchlistService).deleteWatchListItem(1);

        ResponseEntity<Void> response = watchListController.deleteWatchListItem(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
