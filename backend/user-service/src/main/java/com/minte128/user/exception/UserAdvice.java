package com.minte128.user.exception;

import com.minte128.user.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserAdvice {
    @ExceptionHandler(NotFoundException.class)
    private ResponseEntity<Object> transactionNotFoundException(NotFoundException transactionNotFoundException) {
        ErrorResponseDTO errorResponse = ErrorResponseDTO.builder()
                .timestamp(System.currentTimeMillis())
                .status(HttpStatus.NOT_FOUND.value())
                .message(transactionNotFoundException.getMessage())
                .title(HttpStatus.NOT_FOUND.getReasonPhrase())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(errorResponse);
    }

    @ExceptionHandler(UserAlreadyExists.class)
    private ResponseEntity<Object> userAlreadyExistsException(UserAlreadyExists userAlreadyExists) {
        ErrorResponseDTO errorResponse = ErrorResponseDTO.builder()
                .timestamp(System.currentTimeMillis())
                .status(HttpStatus.CONFLICT.value())
                .message(userAlreadyExists.getMessage())
                .title(HttpStatus.CONFLICT.getReasonPhrase())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(errorResponse);
    }

}
