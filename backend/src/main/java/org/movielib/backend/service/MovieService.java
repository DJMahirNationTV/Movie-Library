package org.movielib.backend.service;

import lombok.RequiredArgsConstructor;
import org.movielib.backend.dto.omdbMovieResponse;
import org.movielib.backend.model.Movie;
import org.movielib.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class MovieService {

    private static final Pattern IMDB_ID_PATTERN = Pattern.compile("^tt\\d{7,8}$");

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
        if (imdbId == null || !IMDB_ID_PATTERN.matcher(imdbId).matches()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid IMDb ID format. Expected values like tt0433386."
            );
        }

        return omdbRestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("apikey", omdbApiKey)
                        .queryParam("i", imdbId)
                        .build())
                .retrieve()
                .body(omdbMovieResponse.class);
    }
}
