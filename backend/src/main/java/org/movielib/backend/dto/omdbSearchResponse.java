package org.movielib.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record omdbSearchResponse(
        @JsonProperty("Search") List<omdbSearchItem> search,
        @JsonProperty("totalResults") String totalResults,
        @JsonProperty("Response") String response,
        @JsonProperty("Error") String error
) {}