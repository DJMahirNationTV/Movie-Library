package org.movielib.backend.service;

import lombok.RequiredArgsConstructor;
import org.movielib.backend.dto.omdbMovieResponse;
import org.movielib.backend.model.Movie;
import org.movielib.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final RestClient omdbRestClient;

    @Value("${omdb.api.key:}")
    private String omdbApiKey;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public omdbMovieResponse fetchMovieFromOmdb(String imdbId) {
        return omdbRestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("i", imdbId)
                        .queryParam("apikey", omdbApiKey)
                        .build())
                .retrieve()
                .body(omdbMovieResponse.class);
    }
}
