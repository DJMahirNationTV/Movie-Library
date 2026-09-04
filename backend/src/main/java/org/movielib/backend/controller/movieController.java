package org.movielib.backend.controller;

import org.movielib.backend.dto.OmdbMovieResponse;
import org.movielib.backend.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173") // for now, I would say, its 5173, but we can change it later...
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }
    @GetMapping("/{imdbId}")
    public ResponseEntity<OmdbMovieResponse> getMovie(@PathVariable String imdbId) {
        OmdbMovieResponse movie = movieService.getMovieByImdbId(imdbId);
        return ResponseEntity.ok(movie);
    }
}