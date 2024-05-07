package com.minte128.cryptoservice.service;

import com.minte128.cryptoservice.dto.HoldingDto;
import com.minte128.cryptoservice.dto.WatchlistDto;
import com.minte128.cryptoservice.entity.Crypto;
import com.minte128.cryptoservice.entity.CryptoHolding;
import com.minte128.cryptoservice.entity.Watchlist;
import com.minte128.cryptoservice.exception.CryptoNotFoundException;
import com.minte128.cryptoservice.exception.InvalidAmountValueException;
import com.minte128.cryptoservice.exception.InvalidIDException;
import com.minte128.cryptoservice.mapper.HoldingMapper;
import com.minte128.cryptoservice.mapper.WatchlistMapper;
import com.minte128.cryptoservice.repository.CryptoRepository;
import com.minte128.cryptoservice.repository.HoldingRepository;
import com.minte128.cryptoservice.repository.WatchlistRepository;
import com.minte128.cryptoservice.service.HoldingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class HoldingServiceImpl implements HoldingService {

    @Autowired
    private HoldingRepository holdingRepository;

    @Autowired
    private CryptoRepository cryptoRepository;

    @Override
    public List<HoldingDto> getAllCryptoHoldings(Integer userId, String cryptoId) {
        log.info("Started process to fetch crypto holdings..");
        List<CryptoHolding> cryptoHoldings;

        if (cryptoId != null) {
            log.info("Fetching crypto holdings with crypto filter..");
            cryptoHoldings = holdingRepository.findByUserIdAndCryptoId(userId, cryptoId);
        } else {
            log.info("Fetching all crypto holdings without any filter..");
            cryptoHoldings = holdingRepository.findByUserId(userId);
        }

        if (cryptoHoldings == null || cryptoHoldings.isEmpty()) {
            return new ArrayList<>();
        }
        log.info("Completed process to fetch crypto holdings..");
        return cryptoHoldings.stream().map(HoldingMapper::convertToDto).toList();
    }

    @Override
    @Transactional
    public void addCryptoHolding(HoldingDto cryptoHoldingDto) throws InvalidIDException, InvalidAmountValueException {
        log.info("Started process to add crypto holdings..");
        if (cryptoHoldingDto.getCrypto() == null) {
            throw new CryptoNotFoundException("Kindly enter valid crypto ID.");
        }
        if (cryptoHoldingDto.getUserId() == null || cryptoHoldingDto.getUserId() <= 0) {
            throw new InvalidIDException("Kindly enter valid user ID");
        }
        if (cryptoHoldingDto.getAmount() <= 0) {
            throw new InvalidAmountValueException();
        }
        Optional<Crypto> crypto = cryptoRepository.findById(cryptoHoldingDto.getCrypto().getId());
        if (crypto.isEmpty()) {
            throw new CryptoNotFoundException("Crypto does not matches with current crypto id.");
        }
        CryptoHolding cryptoHolding = HoldingMapper.convertToEntity(cryptoHoldingDto);
        cryptoHolding.setCrypto(crypto.get());
        holdingRepository.save(cryptoHolding);
        log.info("Completed process to add crypto holdings..");
    }

    @Override
    public HoldingDto getCryptoHoldingById(Integer cryptoHoldingId) {
        log.info("Started process to fetch crypto holdings as per id..");
        Optional<CryptoHolding> cryptoHolding = holdingRepository.findById(cryptoHoldingId);
        if (cryptoHolding.isEmpty()) {
            throw new InvalidIDException("Kindly enter valid crypto ID.");
        }
        log.info("Completed process to fetch crypto holdings as per id..");
        return HoldingMapper.convertToDto(cryptoHolding.get());
    }

    @Override
    public void updateCryptoHolding(Integer cryptoHoldingId, HoldingDto cryptoHoldingDto) throws InvalidIDException {
        log.info("Started process to update Crypto holding..");
        Optional<CryptoHolding> cryptoHolding = holdingRepository.findById(cryptoHoldingId);
        if (cryptoHolding.isEmpty()) {
            throw new InvalidIDException("Kindly enter valid crypto holding id");
        }
        if(cryptoHoldingDto.getQuantity() > 0){
            cryptoHolding.get().setQuantity(cryptoHoldingDto.getQuantity());
        }
        cryptoHolding.get().setAmount(cryptoHoldingDto.getAmount());
        holdingRepository.save(cryptoHolding.get());
        log.info("Completed process to update Crypto holding..");
    }

    @Override
    public void deleteCryptoHolding(Integer cryptoHoldingId) {
        log.info("Started process to delete crypto holding..");
        Optional<CryptoHolding> cryptoHolding = holdingRepository.findById(cryptoHoldingId);
        if (cryptoHolding.isPresent()) {
            holdingRepository.deleteById(cryptoHoldingId);
        }
        log.info("Completed process to delete crypto holding..");
    }
}
