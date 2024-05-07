package com.minte128.cryptoservice.service;

import com.minte128.cryptoservice.dto.CryptoDto;
import com.minte128.cryptoservice.dto.HoldingDto;
import com.minte128.cryptoservice.entity.Crypto;
import com.minte128.cryptoservice.entity.CryptoHolding;
import com.minte128.cryptoservice.exception.CryptoNotFoundException;
import com.minte128.cryptoservice.exception.InvalidAmountValueException;
import com.minte128.cryptoservice.exception.InvalidIDException;
import com.minte128.cryptoservice.repository.CryptoRepository;
import com.minte128.cryptoservice.repository.HoldingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

class CryptoHoldingServiceTest {

    @InjectMocks
    private HoldingServiceImpl cryptoHoldingService;

    @Mock
    private HoldingRepository cryptoHoldingRepo;

    @Mock
    private CryptoRepository cryptoRepository;

    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllCryptoHoldings_success() {
        Integer userId = 1;
        String cryptoId = "bitcoin";
        List<CryptoHolding> mockCryptoHoldings = new ArrayList<>();
        mockCryptoHoldings.add(mockCryptoHolding(userId, cryptoId));

        when(cryptoHoldingRepo.findByUserIdAndCryptoId(userId, cryptoId)).thenReturn(mockCryptoHoldings);
        List<HoldingDto> result = cryptoHoldingService.getAllCryptoHoldings(userId, cryptoId);
        assertNotNull(result);
        assertFalse(result.isEmpty());
    }

    @Test
    void testGetAllCryptoHoldings_nullCryptoFilter_success() {
        Integer userId = 1;
        List<CryptoHolding> mockCryptoHoldings = new ArrayList<>();
        mockCryptoHoldings.add(mockCryptoHolding(userId, null));

        when(cryptoHoldingRepo.findByUserId(userId)).thenReturn(mockCryptoHoldings);
        List<HoldingDto> result = cryptoHoldingService.getAllCryptoHoldings(userId, null);
        assertNotNull(result);
        assertFalse(result.isEmpty());
    }

    @Test
    void testGetAllCryptoHoldings_emptyResult() {
        Integer userId = 1;
        String cryptoId = "bitcoin";
        List<CryptoHolding> mockCryptoHoldings = new ArrayList<>();

        when(cryptoHoldingRepo.findByUserIdAndCryptoId(userId, cryptoId)).thenReturn(mockCryptoHoldings);
        List<HoldingDto> result = cryptoHoldingService.getAllCryptoHoldings(userId, cryptoId);
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testAddCryptoHolding_success() throws InvalidIDException, InvalidAmountValueException {
        String cryptoId = "bitcoin";
        HoldingDto cryptoHoldingDto = mockCryptoHoldingDto(1, cryptoId, 100.0);

        CryptoHolding mockCryptoHolding = new CryptoHolding();
        when(modelMapper.map(cryptoHoldingDto, CryptoHolding.class)).thenReturn(mockCryptoHolding);
        when(cryptoRepository.findById(cryptoId)).thenReturn(Optional.of(mockCrypto(cryptoId)));
        when(cryptoHoldingRepo.save(any(CryptoHolding.class))).thenReturn(mockCryptoHolding);

        assertDoesNotThrow(() -> cryptoHoldingService.addCryptoHolding(cryptoHoldingDto));
    }

    @Test
    void testAddCryptoHolding_nullUser_exception() throws InvalidIDException, InvalidAmountValueException {
        HoldingDto cryptoHoldingDto = mockCryptoHoldingDto(null, "bitcoin", 100.0);
        assertThrows(InvalidIDException.class, () -> cryptoHoldingService.addCryptoHolding(cryptoHoldingDto));
    }

    @Test
    void testAddCryptoHolding_userWithZeroValue_exception() throws InvalidIDException, InvalidAmountValueException {
        HoldingDto cryptoHoldingDto = mockCryptoHoldingDto(0, "bitcoin", 100.0);
        CryptoHolding mockCryptoHolding = new CryptoHolding();

        assertThrows(InvalidIDException.class, () -> cryptoHoldingService.addCryptoHolding(cryptoHoldingDto));
    }

    @Test
    void testAddCryptoHolding_nullCrypto_exception() {
        HoldingDto cryptoHoldingDto = mockCryptoHoldingDto(1, null, 100.0);
        CryptoHolding mockCryptoHolding = new CryptoHolding();

        assertThrows(CryptoNotFoundException.class, () -> cryptoHoldingService.addCryptoHolding(cryptoHoldingDto));
    }

    @Test
    void testAddCryptoHolding_cryptoWithZeroValue_exception() throws InvalidIDException, InvalidAmountValueException {
        String cryptoId = "";
        HoldingDto cryptoHoldingDto = mockCryptoHoldingDto(1, cryptoId, 100.0);
        CryptoHolding mockCryptoHolding = new CryptoHolding();
        when(cryptoRepository.findById(cryptoId)).thenReturn(Optional.empty());

        assertThrows(CryptoNotFoundException.class, () -> cryptoHoldingService.addCryptoHolding(cryptoHoldingDto));
    }

    @Test
    void testAddCryptoHolding_amountWithZeroValue_exception() throws InvalidIDException, InvalidAmountValueException {
        HoldingDto cryptoHoldingDto = mockCryptoHoldingDto(1, "bitcoin", 0.0);
        CryptoHolding mockCryptoHolding = new CryptoHolding();

        assertThrows(InvalidAmountValueException.class, () -> cryptoHoldingService.addCryptoHolding(cryptoHoldingDto));
    }

    @Test
    void testGetCryptoHoldingById_success() {
        Integer cryptoHoldingId = 1;
        CryptoHolding mockCryptoHolding = mockCryptoHolding(cryptoHoldingId);

        when(cryptoHoldingRepo.findById(cryptoHoldingId)).thenReturn(Optional.of(mockCryptoHolding));
        HoldingDto result = cryptoHoldingService.getCryptoHoldingById(cryptoHoldingId);

        Mockito.verify(cryptoHoldingRepo, times(1)).findById(cryptoHoldingId);
    }

    @Test
    void testGetCryptoHoldingById_notFound() {
        Integer cryptoHoldingId = 1;

        when(cryptoHoldingRepo.findById(cryptoHoldingId)).thenReturn(Optional.empty());
        assertThrows(InvalidIDException.class, () -> cryptoHoldingService.getCryptoHoldingById(cryptoHoldingId));
    }

    @Test
    void testUpdateCryptoHolding_success() throws InvalidIDException {
        Integer cryptoHoldingId = 1;
        HoldingDto cryptoHoldingDto = new HoldingDto();
        cryptoHoldingDto.setAmount(200.0);
        cryptoHoldingDto.setQuantity(4);
        CryptoHolding mockCryptoHolding = mockCryptoHolding(cryptoHoldingId);

        when(cryptoHoldingRepo.findById(cryptoHoldingId)).thenReturn(Optional.of(mockCryptoHolding));
        when(cryptoHoldingRepo.save(any(CryptoHolding.class))).thenReturn(mockCryptoHolding);

        assertDoesNotThrow(() -> cryptoHoldingService.updateCryptoHolding(cryptoHoldingId, cryptoHoldingDto));
        assertEquals(200.0, mockCryptoHolding.getAmount());
    }

    @Test
    void testUpdateCryptoHolding_withoutQty_success() throws InvalidIDException {
        Integer cryptoHoldingId = 1;
        HoldingDto cryptoHoldingDto = new HoldingDto();
        cryptoHoldingDto.setAmount(200.0);
        CryptoHolding mockCryptoHolding = mockCryptoHolding(cryptoHoldingId);

        when(cryptoHoldingRepo.findById(cryptoHoldingId)).thenReturn(Optional.of(mockCryptoHolding));
        when(cryptoHoldingRepo.save(any(CryptoHolding.class))).thenReturn(mockCryptoHolding);

        assertDoesNotThrow(() -> cryptoHoldingService.updateCryptoHolding(cryptoHoldingId, cryptoHoldingDto));
        assertEquals(200.0, mockCryptoHolding.getAmount());
    }

    @Test
    void testUpdateCryptoHolding_invalidID() {
        Integer cryptoHoldingId = 1;
        HoldingDto cryptoHoldingDto = new HoldingDto();
        cryptoHoldingDto.setAmount(200.0);

        when(cryptoHoldingRepo.findById(cryptoHoldingId)).thenReturn(Optional.empty());

        assertThrows(InvalidIDException.class, () -> cryptoHoldingService.updateCryptoHolding(cryptoHoldingId, cryptoHoldingDto));
    }

    private CryptoHolding mockCryptoHolding(Integer cryptoHoldingId) {
        CryptoHolding cryptoHolding = new CryptoHolding();
        cryptoHolding.setId(cryptoHoldingId);
        cryptoHolding.setUserId(1);
        cryptoHolding.setAmount(100.0);

        Crypto crypto = new Crypto();
        crypto.setId("bitcoin");
        cryptoHolding.setCrypto(crypto);

        return cryptoHolding;
    }

    private CryptoHolding mockCryptoHolding(Integer userId, String cryptoId) {
        CryptoHolding cryptoHolding = new CryptoHolding();
        cryptoHolding.setUserId(userId);
        cryptoHolding.setCrypto(mockCrypto(cryptoId));
        cryptoHolding.setAmount(100.0);
        cryptoHolding.setQuantity(5);

        return cryptoHolding;
    }

    private HoldingDto mockCryptoHoldingDto(Integer userId, String cryptoId, double amount) {
        HoldingDto cryptoHoldingDto = new HoldingDto();
        cryptoHoldingDto.setCrypto(mockCryptoDto(cryptoId));
        cryptoHoldingDto.setUserId(userId);
        cryptoHoldingDto.setAmount(amount);

        return cryptoHoldingDto;
    }

    private Crypto mockCrypto(String cryptoId){
        Crypto crypto = new Crypto();
        crypto.setId(cryptoId);
        crypto.setName("Bitcoin");
        crypto.setImage("testImage");
        crypto.setPrice(23000);
        crypto.setAbbreviation("test");
        crypto.setVolume("test");
        crypto.setMarketCap("65000000.0");
        crypto.setCirculatingSupply(1500);

        return crypto;
    }

    private CryptoDto mockCryptoDto(String cryptoId){
        if(cryptoId == null) return null;
        CryptoDto crypto = new CryptoDto();
        crypto.setId(cryptoId);
        crypto.setName("Bitcoin");
        crypto.setImage("testImage");
        crypto.setPrice(23000);
        crypto.setAbbreviation("test");
        crypto.setVolume("test");
        crypto.setMarketCap("65000000.0");
        crypto.setCirculatingSupply(1500);

        return crypto;
    }
}
