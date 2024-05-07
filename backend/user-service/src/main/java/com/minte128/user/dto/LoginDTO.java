package com.minte128.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginDTO {
    private String message;
    private boolean authenticated;
    private String email;
    private String token;
    private Integer id;
}
