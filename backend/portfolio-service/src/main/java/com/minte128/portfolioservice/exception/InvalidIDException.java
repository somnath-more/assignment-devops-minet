package com.minte128.portfolioservice.exception;

public class InvalidIDException extends Exception{

    public InvalidIDException(){
        super("Kindly enter valid id.");
    }

    public InvalidIDException(String message){
        super(message);
    }
}
