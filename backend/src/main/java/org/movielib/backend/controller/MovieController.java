package org.movielib.backend.controller;

import lombok.RequiredArgsConstructor;
import org.movielib.backend.dto.omdbMovieResponse;
import org.movielib.backend.model.Movie;
import org.movielib.backend.service.MovieService;
import org.movielib.backend.dto.omdbSearchResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MovieController {

    private final MovieService movieService;

    // Gibt alle Filme zurück, die in der Datenbank gespeichert sind.
    @GetMapping("/all")
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie); // TODO: Das wäre etwas für die Watchlist bzw. Favoriten eines Nutzers, daher müsste man das noch erweitern
    }

    @GetMapping("/omdb/{imdbId}")
    public ResponseEntity<omdbMovieResponse> getOmdbMovie(@PathVariable String imdbId) {
        // Der holten sich die Daten von der OMDB API und gibt sie mit einem "return" zurück
        return ResponseEntity.ok(movieService.fetchMovieFromOmdb(imdbId));
    }

    // Eine Search engine, damit man quasi Filme suchen kann, die es in der OMDB API gibt.
    @GetMapping("/omdb/search")
    public ResponseEntity<omdbSearchResponse> searchOmdbMovies(@RequestParam String query) {
        return ResponseEntity.ok(movieService.searchMoviesFromOmdb(query));
    }
}