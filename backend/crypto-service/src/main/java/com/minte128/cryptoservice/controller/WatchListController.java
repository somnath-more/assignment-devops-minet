package com.minte128.cryptoservice.controller;

import com.minte128.cryptoservice.dto.WatchlistDto;
import com.minte128.cryptoservice.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/watchlists")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH}, allowedHeaders = "*", exposedHeaders = "Access-Control-Allow-Origin")
public class WatchListController {

    @Autowired
    private WatchlistService watchlistService;

    @GetMapping("/users/{userId}/cryptos/{cryptoId}")
    public ResponseEntity<WatchlistDto> getWatchListByUserIdAndCryptoId(@PathVariable Integer userId, @PathVariable String cryptoId) {
        WatchlistDto watchlistDto = watchlistService.getWatchListByUserIdAndCryptoId(userId, cryptoId);
        return new ResponseEntity<>(watchlistDto, HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<WatchlistDto>> getByUserId(@PathVariable Integer userId) {
        List<WatchlistDto> watchlistDtoList = watchlistService.getByUserId(userId);
        return new ResponseEntity<>(watchlistDtoList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WatchlistDto> postToWatchlist(@RequestBody WatchlistDto watchlistDto) {
        WatchlistDto savedWatchlistDto = watchlistService.postToWatchlist(watchlistDto);
        return new ResponseEntity<>(savedWatchlistDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWatchListItem(@PathVariable Integer id) {
        watchlistService.deleteWatchListItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

