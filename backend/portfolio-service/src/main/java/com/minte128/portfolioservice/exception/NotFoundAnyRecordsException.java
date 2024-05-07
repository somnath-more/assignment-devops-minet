package com.minte128.portfolioservice.exception;

public class NotFoundAnyRecordsException extends Exception{

    public NotFoundAnyRecordsException(){
        super("Input does not matches with any records.");
    }
}
