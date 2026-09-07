package org.movielib.backend.service;

import org.junit.jupiter.api.Test;
import org.movielib.backend.model.Movie;
import org.movielib.backend.repository.MovieRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class MovieServiceTest {

    private final MovieRepository movieRepository = mock(MovieRepository.class);
    private final MovieService movieService = new MovieService(movieRepository);


    @Test
    public void getAllMovies_shouldReturnListOfMovies() {

        //Given
        Movie testMovie = new Movie("1", "Inception", "Sci-Fi", 2010, "tt1375666");
        when(movieRepository.findAll()).thenReturn(List.of(testMovie));

        //When
        List<Movie> actual = movieService.getAllMovies();

        //Then
        assertEquals(List.of(testMovie), actual);
        verify(movieRepository).findAll();
    }

    @Test
    void addMovie_shouldSaveAndReturnMovie() {
        // GIVEN
        Movie movieToSave = new Movie(null, "Inception", "Sci-Fi", 2010, "tt1375666");
        Movie savedMovie = new Movie("1", "Inception", "Sci-Fi", 2010, "tt1375666");
        when(movieRepository.save(movieToSave)).thenReturn(savedMovie);

        // WHEN
        Movie actual = movieService.addMovie(movieToSave);

        // THEN
        assertEquals(savedMovie, actual);
        verify(movieRepository).save(movieToSave);
    }

}
