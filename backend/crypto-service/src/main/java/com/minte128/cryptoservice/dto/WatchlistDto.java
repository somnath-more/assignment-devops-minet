package com.minte128.cryptoservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WatchlistDto {
    private Integer id;
    private Integer userId;
    private String cryptoId;
}
