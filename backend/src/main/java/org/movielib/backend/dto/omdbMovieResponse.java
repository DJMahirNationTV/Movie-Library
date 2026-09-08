package org.movielib.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
// Wir können nachher weitere sachen einfügen, aber für den Zeitpunkt reich es erstmal.
public record omdbMovieResponse(
        @JsonProperty("Title") String title,
        @JsonProperty("Year") String year,
        @JsonProperty("imdbID") String imdbId,
        @JsonProperty("Type") String type,
        @JsonProperty("Poster") String poster,
        @JsonProperty("Plot") String plot,
        @JsonProperty("Response") String response,
        @JsonProperty("Error") String error
) {}