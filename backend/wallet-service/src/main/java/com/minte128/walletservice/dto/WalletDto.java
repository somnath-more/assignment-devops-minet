package com.minte128.walletservice.dto;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WalletDto {

    @Positive(message = "Id must be a positive integer")
    @Max(value = 32, message = "Id must be at most 32")
    private Integer id;

    @NotNull(message = "Amount cannot be null")
    @PositiveOrZero(message = "Amount must be a positive or zero double value")
    @Digits(integer = 13, fraction = 15, message = "Amount must have at most 15 decimal places")
    private Double amount;


    @PositiveOrZero(message = "UserId must be a positive integer")
    @Max(Integer.MAX_VALUE)
    @Digits(integer = 10, fraction = 0, message = "UserId must be a positive integer with at most 10 digits")
    @Column(unique = true)

    private Integer userId;
}
