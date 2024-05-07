package com.minet128.apigateway.filter;

import com.minet128.apigateway.utlis.ApiConstants;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final Predicate<ServerHttpRequest> isSecured =
            request -> ApiConstants.OPEN_API_ENDPOINTS
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().equals(uri));

}
