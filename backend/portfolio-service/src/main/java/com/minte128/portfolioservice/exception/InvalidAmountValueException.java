package com.minte128.portfolioservice.exception;

public class InvalidAmountValueException extends Exception{
    public InvalidAmountValueException(){
        super("Please enter amount greater then 0.");
    }

    public InvalidAmountValueException(String message){
        super(message);
    }
}
