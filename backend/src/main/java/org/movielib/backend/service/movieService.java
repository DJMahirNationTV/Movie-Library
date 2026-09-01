package org.movielib.backend.service;

import org.movielib.backend.dto.OmdbMovieResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class MovieService {

    private final RestClient omdbRestClient;

    @Value("${omdb.api.key}") // API Key from Properties
    private String apiKey;

    public MovieService(RestClient omdbRestClient) {
        this.omdbRestClient = omdbRestClient;
    }

    public OmdbMovieResponse getMovieByImdbId(String imdbId) {
        return omdbRestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("i", imdbId)
                        .queryParam("apikey", apiKey)
                        .build())
                .retrieve()
                .body(OmdbMovieResponse.class);
    }
}