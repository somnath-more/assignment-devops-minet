package com.minte128.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponseDTO {
    private long timestamp;
    private int status;
    private String title;
    private String message;
}
