package com.minte128.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;

    private String firstName;
    @NotNull(message = "email should provided")
    private String email;
    @NotNull(message = "password should be provided")
    private String password;
}
