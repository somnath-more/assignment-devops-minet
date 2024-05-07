package com.minte128.walletservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minte128.walletservice.dto.WalletDto;
import com.minte128.walletservice.service.WalletService;
import jakarta.ws.rs.core.MediaType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = WalletController.class)
class WalletControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WalletService walletService;

    @InjectMocks
    private WalletController walletController;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetWalletDetailsById() throws Exception {
        int userId = 1;
        WalletDto walletDto = new WalletDto();
        walletDto.setUserId(userId);
        walletDto.setAmount(100.0);

        when(walletService.findByUserId(userId)).thenReturn(walletDto);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/wallets")
                .param("userId", String.valueOf(userId))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value(userId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.amount").value(100.0));
    }

    @Test
    void testSaveWalletDetails() throws Exception {
        WalletDto walletDto = new WalletDto();
        walletDto.setUserId(1);
        walletDto.setAmount(200.0);

        when(walletService.saveWalletDetails(walletDto)).thenReturn(walletDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/wallets")
                .content(objectMapper.writeValueAsString(walletDto))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.amount").value(200.0));
    }
    @Test
    void testUpdateWalletDetails() throws Exception {
        int walletId = 1;

        WalletDto updatedWalletDto = new WalletDto();
        updatedWalletDto.setUserId(1);
        updatedWalletDto.setAmount(300.0);

        when(walletService.updateWalletDetails(walletId, updatedWalletDto))
                .thenReturn(updatedWalletDto);

        mockMvc.perform(MockMvcRequestBuilders.patch("/api/v1/wallets/{id}", walletId)
                        .content(objectMapper.writeValueAsString(updatedWalletDto))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.amount").value(300.0));
    }

}
