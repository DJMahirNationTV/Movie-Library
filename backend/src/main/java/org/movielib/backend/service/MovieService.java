package org.movielib.backend.service;

import lombok.RequiredArgsConstructor;
import org.movielib.backend.dto.omdbMovieResponse;
import org.movielib.backend.dto.omdbSearchItem;
import org.movielib.backend.dto.omdbSearchResponse;
import org.movielib.backend.model.Movie;
import org.movielib.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class MovieService {

    private static final Pattern IMDB_ID_PATTERN = Pattern.compile("^tt\\d{7,8}$");

    private final MovieRepository movieRepository;
    private final RestClient omdbRestClient;

    @Value("${omdb.api.key}")
    private String omdbApiKey;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public omdbSearchResponse searchMoviesFromOmdb(String query) {
        List<omdbSearchItem> allMovies = new ArrayList<>();
        String totalResults = "0"; // initalisert die Result anzahl auf 0, damit man es durch den Algorithmus updaten kann.

        // Algoritumus für den Page (habs von: https://forum.freecodecamp.org/t/how-to-get-all-movies-from-omdbapi/423905/8)
        for (int page = 1; page <= 5; page++) {
            final int currentPage = page;

            omdbSearchResponse pageResponse = omdbRestClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("apikey", omdbApiKey)
                            .queryParam("s", query)
                            .queryParam("type", "movie")
                            .queryParam("page", currentPage)
                            .build())
                    .retrieve()
                    .body(omdbSearchResponse.class);

            // brich ab, wenn der response falsch oder incorrect oder leer ist
            if (pageResponse == null
                    || "False".equalsIgnoreCase(pageResponse.response())
                    || pageResponse.search() == null
                    || pageResponse.search().isEmpty()) {

                // gibt den Fehler von omdb ab (sein eigener Fehler)
                if (page == 1 && pageResponse != null) {
                    return pageResponse;
                }
                break;
            }

            allMovies.addAll(pageResponse.search());
            totalResults = pageResponse.totalResults();
        }

        if (allMovies.isEmpty()) {
            return new omdbSearchResponse(List.of(), "0", "False", "Film nicht gefunden!");
        }

        return new omdbSearchResponse(allMovies, totalResults, "True", null);
    }

    public omdbMovieResponse fetchMovieFromOmdb(String imdbId) {
        if (imdbId == null || !IMDB_ID_PATTERN.matcher(imdbId).matches()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ungültige ID, bitte eine gültige IMDB-ID im Format 'tt1234567' angeben."
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