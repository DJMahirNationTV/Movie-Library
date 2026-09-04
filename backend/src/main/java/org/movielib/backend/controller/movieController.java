package org.movielib.backend.controller;

import org.movielib.backend.dto.omdbMovieResponse;
import org.movielib.backend.service.movieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173") // for now, I would say, its 5173, but we can change it later...
public class movieController {
    private final movieService movieService;

    public movieController(movieService movieService) {
        this.movieService = movieService;
    }
    @GetMapping("/{imdbId}")
    public ResponseEntity<omdbMovieResponse> getMovie(@PathVariable String imdbId) {
        omdbMovieResponse movie = movieService.getMovieByImdbId(imdbId);
        return ResponseEntity.ok(movie);
    }
}