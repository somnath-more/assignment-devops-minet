package com.minte128.cryptoservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CryptoDto {
    private String id;
    private String name;

    @JsonProperty("market_cap")
    private String marketCap;
    @JsonProperty("total_volume")
    private String volume;
    @JsonProperty("current_price")
    private long price;
    @JsonProperty("circulating_supply")
    private double circulatingSupply;
    @JsonProperty("symbol")
    private String abbreviation;
    @JsonProperty("price_change_percentage_24h")
    private double priceChangePercentage24h;
    private String image;
}
