package org.movielib.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class AppConfig {

    @Value("${omdb.api.base-url}") // Fetch the API URL from application.properties
    private String omdbBaseUrl;

    @Bean
    public RestClient omdbRestClient() {
        return RestClient.builder()
                .baseUrl(omdbBaseUrl)
                .build();
    }
}