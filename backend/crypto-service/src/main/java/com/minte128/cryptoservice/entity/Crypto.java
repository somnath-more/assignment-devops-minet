package com.minte128.cryptoservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="cryptocurrency")
public class Crypto {

    @Id
    @Column
    private String id;
    @Column
    private String name;
    @Column
    private String marketCap;
    @Column
    private String volume;
    @Column
    private long price;
    @Column
    private double circulatingSupply;
    @Column
    private String abbreviation;
    @Column
    private String image;
    @Column
    private double priceChangePercentage24h;
}
