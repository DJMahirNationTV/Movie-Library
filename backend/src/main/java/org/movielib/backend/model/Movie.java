package org.movielib.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document

public class Movie {

    @Id
    private String id;
    private String title;
    private String genre;
    private int year;
    private String omdbId;
}
