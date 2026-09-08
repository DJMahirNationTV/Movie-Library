package org.movielib.backend.controller;

import lombok.RequiredArgsConstructor;
import org.movielib.backend.model.Movie;
import org.movielib.backend.service.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {
// uiashd
    private final MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie);
    }
}
