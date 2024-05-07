package com.minte128.cryptoservice.service;

import com.minte128.cryptoservice.dto.CryptoDto;
import com.minte128.cryptoservice.entity.Crypto;
import com.minte128.cryptoservice.repository.CryptoRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class GeckoCoinService {

    @Value("${geckoUrl}")
    private String geckoUrl;

    @Autowired
    private CryptoRepository cryptoRepository;

    private ModelMapper modelMapper;

    public GeckoCoinService() {
        modelMapper = new ModelMapper();
    }

    @Scheduled(fixedRate = 720000)
    public void uploadGeckoData() {
        List<CryptoDto> geckoCoinsDto = fetchData();
        List<Crypto> cryptoEntities = new ArrayList<>();

        for (CryptoDto geckoCoinDto : geckoCoinsDto) {
            Crypto crypto = modelMapper.map(geckoCoinDto, Crypto.class);
            cryptoEntities.add(crypto);
        }
        cryptoRepository.saveAll(cryptoEntities);
    }

    private List<CryptoDto> fetchData() {
        String vsCurrency = "usd";
        String urlTemplate = UriComponentsBuilder.fromHttpUrl(geckoUrl).queryParam("vs_currency", vsCurrency).queryParam("ids", "bitcoin,ethereum,binancecoin,ethereum-classic,tether,cardano,ripple,dogecoin,usd-coin").encode().toUriString();
        RestTemplate restTemplate = new RestTemplate();
        CryptoDto[] geckoResponse = restTemplate.getForObject(urlTemplate, CryptoDto[].class);
        return Arrays.asList(geckoResponse);
    }
}
