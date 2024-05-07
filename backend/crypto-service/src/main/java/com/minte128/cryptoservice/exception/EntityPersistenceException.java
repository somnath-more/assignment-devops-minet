package com.minte128.cryptoservice.exception;

import jakarta.persistence.PersistenceException;

public class EntityPersistenceException extends PersistenceException {
    public EntityPersistenceException(String message) {super(message);}
}
