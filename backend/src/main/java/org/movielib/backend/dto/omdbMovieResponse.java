package org.movielib.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
// We have to check, which fields we want here... For now, I initzalized the fields that I thought of..
public record OmdbMovieResponse(
        @JsonProperty("Title") String title,
        @JsonProperty("Year") String year,
        @JsonProperty("imdbID") String imdbId,
        @JsonProperty("Type") String type,
        @JsonProperty("Poster") String poster,
        @JsonProperty("Plot") String plot,
        @JsonProperty("Response") String response,
        @JsonProperty("Error") String error
) {}