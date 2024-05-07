package com.minte128.user.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserModelMapper {
    @Bean
    ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
