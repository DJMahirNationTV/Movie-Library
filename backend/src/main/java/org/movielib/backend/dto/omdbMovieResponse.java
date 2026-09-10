package org.movielib.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

// Wir können nachher weitere sachen einfügen, aber für den Zeitpunkt reich es erstmal.
public record omdbMovieResponse(
        @JsonProperty("Title") String title,
        @JsonProperty("Year") String year,
        @JsonProperty("Rated") String rated,
        @JsonProperty("Released") String released,
        @JsonProperty("Runtime") String runtime,
        @JsonProperty("Genre") String genre,
        @JsonProperty("Director") String director,
        @JsonProperty("Writer") String writer,
        @JsonProperty("Actors") String actors,
        @JsonProperty("Plot") String plot,
        @JsonProperty("Language") String language,
        @JsonProperty("Country") String country,
        @JsonProperty("Awards") String awards,
        @JsonProperty("Poster") String poster,
        @JsonProperty("Ratings") List<Rating> ratings,
        @JsonProperty("Metascore") String metascore,
        @JsonProperty("imdbRating") String imdbRating,
        @JsonProperty("imdbVotes") String imdbVotes,
        @JsonProperty("imdbID") String imdbId,
        @JsonProperty("Type") String type,
        @JsonProperty("BoxOffice") String boxOffice,
        @JsonProperty("Response") String response,
        @JsonProperty("Error") String error
) {
    public record Rating(
            @JsonProperty("Source") String source,
            @JsonProperty("Value") String value
    ) {}
}

