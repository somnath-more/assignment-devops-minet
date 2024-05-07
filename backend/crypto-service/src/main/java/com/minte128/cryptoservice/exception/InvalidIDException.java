package com.minte128.cryptoservice.exception;

public class InvalidIDException extends RuntimeException{

    public InvalidIDException(){
        super("Kindly enter valid id.");
    }

    public InvalidIDException(String message){
        super(message);
    }
}
