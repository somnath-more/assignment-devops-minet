package com.minte128.cryptoservice.service;

import com.minte128.cryptoservice.dto.CryptoDto;
import com.minte128.cryptoservice.entity.Crypto;
import com.minte128.cryptoservice.exception.CryptoNotFoundException;
import com.minte128.cryptoservice.exception.EntityPersistenceException;
import com.minte128.cryptoservice.repository.CryptoRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Slf4j
public class CryptoServiceImpl implements CryptoService{

    @Autowired
    private CryptoRepository cryptoRepository;
    private ModelMapper modelMapper;

    public CryptoServiceImpl(){modelMapper = new ModelMapper();}
    @Override
    public List<CryptoDto> getAllCryptos() {
        try {
            List<Crypto> cryptos = cryptoRepository.findAll();
            return cryptos.stream().map(crypto -> modelMapper.map(crypto, CryptoDto.class)).toList();
        }catch (EntityPersistenceException e){
            throw new EntityPersistenceException("error while fetching coins");
        }
    }

    @Override
    public CryptoDto getCryptoById(String id) {
        try{
            Crypto crypto = cryptoRepository.findById(id).orElseThrow(() -> new CryptoNotFoundException("Coin not found with id " + id));
            return modelMapper.map(crypto, CryptoDto.class);
        }catch (CryptoNotFoundException e){
            throw new CryptoNotFoundException(e.getMessage());
        }
    }
}
