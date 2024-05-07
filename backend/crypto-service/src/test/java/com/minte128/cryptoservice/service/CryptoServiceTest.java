package com.minte128.cryptoservice.service;

import com.minte128.cryptoservice.dto.CryptoDto;
import com.minte128.cryptoservice.entity.Crypto;
import com.minte128.cryptoservice.exception.CryptoNotFoundException;
import com.minte128.cryptoservice.exception.EntityPersistenceException;
import com.minte128.cryptoservice.repository.CryptoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

 class CryptoServiceTest {

    @Mock
    private CryptoRepository cryptoRepository;

    @InjectMocks
    private CryptoServiceImpl cryptoService;

    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllCryptos() {
        Crypto crypto1 = new Crypto();
        crypto1.setId("1");
        crypto1.setName("Bitcoin");

        Crypto crypto2 = new Crypto();
        crypto2.setId("2");
        crypto2.setName("Ethereum");

        List<Crypto> cryptoList = Arrays.asList(crypto1, crypto2);

        Mockito.when(cryptoRepository.findAll()).thenReturn(cryptoList);

        Mockito.when(modelMapper.map(Mockito.any(), Mockito.eq(CryptoDto.class)))
                .thenAnswer(args -> {
                    Crypto source = args.getArgument(0);
                    CryptoDto dto = new CryptoDto();
                    dto.setId(source.getId());
                    dto.setName(source.getName());
                    return dto;
                });

        List<CryptoDto> cryptoDtos = cryptoService.getAllCryptos();

        assertEquals(2, cryptoDtos.size());
        assertEquals("1", cryptoDtos.get(0).getId());
        assertEquals("Bitcoin", cryptoDtos.get(0).getName());
        assertEquals("2", cryptoDtos.get(1).getId());
        assertEquals("Ethereum", cryptoDtos.get(1).getName());
    }

    @Test
    void testGetCryptoById() {
        Crypto crypto = new Crypto();
        crypto.setId("1");
        crypto.setName("Bitcoin");

        Mockito.when(cryptoRepository.findById("1")).thenReturn(Optional.of(crypto));
        Mockito.when(modelMapper.map(Mockito.any(), Mockito.eq(CryptoDto.class)))
                .thenAnswer(args -> {
                    Crypto source = args.getArgument(0);
                    CryptoDto dto = new CryptoDto();
                    dto.setId(source.getId());
                    dto.setName(source.getName());
                    return dto;
                });

        CryptoDto cryptoDto = cryptoService.getCryptoById("1");

        assertEquals("1", cryptoDto.getId());
        assertEquals("Bitcoin", cryptoDto.getName());
    }

    @Test
    void testGetCryptoByIdNotFound() {
        Mockito.when(cryptoRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(CryptoNotFoundException.class, () -> cryptoService.getCryptoById("1"));
    }

    @Test
    void whenGetAllCoins_returnEntityPersistenceException() {
        when(cryptoRepository.findAll()).thenThrow(EntityPersistenceException.class);
        EntityPersistenceException exception = assertThrows(EntityPersistenceException.class, () -> cryptoService.getAllCryptos());
        assertEquals("error while fetching coins",exception.getMessage());
        verify(cryptoRepository, times(1)).findAll();
    }
}


