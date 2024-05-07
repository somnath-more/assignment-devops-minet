package com.minte128.cryptoservice.controller;

import com.minte128.cryptoservice.dto.CryptoDto;
import com.minte128.cryptoservice.service.CryptoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(CryptoController.class)
class CryptoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CryptoService cryptoService;

    @Test
    void whenGetAllCoins_returnAllCoins() throws Exception {
        List<CryptoDto> cryptoDtos = Arrays.asList(
                new CryptoDto("1", "Bitcoin", "387467389", "78676879", 387467389, 78676879, "BTC", 15, "url"),
                new CryptoDto("2", "Ethereum", "387467389", "78676879", 387467389, 78676879, "ETC", 15, "url")
        );
        when(cryptoService.getAllCryptos()).thenReturn(cryptoDtos);

        mockMvc.perform(get("/api/v1/cryptos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void givenCoinId_whenGetById_returnCoin() throws Exception {
        CryptoDto cryptoDto = new CryptoDto("1", "Bitcoin", "387467389", "78676879", 387467389, 78676879, "BTC", 15, "url");

        when(cryptoService.getCryptoById("1")).thenReturn(cryptoDto);

        mockMvc.perform(get("/api/v1/cryptos/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name", is("Bitcoin")));
    }
}

