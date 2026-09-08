package org.movielib.backend.controller;

import lombok.RequiredArgsConstructor;
import org.movielib.backend.dto.omdbMovieResponse;
import org.movielib.backend.model.Movie;
import org.movielib.backend.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<omdbMovieResponse> getMovieByImdbId(@PathVariable String imdbId) {
        omdbMovieResponse movie = movieService.fetchMovieFromOmdb(imdbId);
        return ResponseEntity.ok(movie);
    }
}
