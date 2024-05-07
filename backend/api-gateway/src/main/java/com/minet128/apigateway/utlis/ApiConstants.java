package com.minet128.apigateway.utlis;

import java.util.List;

public final class ApiConstants {
    public static final List<String> OPEN_API_ENDPOINTS = List.of(
            "/api/v1/users",
            "/api/v1/users/getUserByEmail",
            "/api/v1/users/authenticate",
            "/api/v1/users/signIn",
            "/api/v1/users/signup",
            "/eureka"
    );

    private ApiConstants() {
    }
}
