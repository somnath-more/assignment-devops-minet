package com.minte128.cryptoservice.exception;

public class WatchlistNotFoundException extends RuntimeException {
    public WatchlistNotFoundException(String message){
        super(message);
    }
}
