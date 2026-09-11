import axios from "axios";

export const fetchMovies = async (query, maxPages = 5) => {
    const apiKey = 'fc9ec52f';
    let allMovies = [];

    try {
        for (let page = 1; page <= maxPages; page++) {
            const res = await axios.get('https://www.omdbapi.com/', {
                params: {
                    apikey: apiKey,
                    s: query,
                    type: 'movie',
                    page: page,
                },
            });

            // Stop looping if OMDb returns no more results
            if (res.data.Response === 'False' || !res.data.Search) {
                break;
            }

            allMovies = [...allMovies, ...res.data.Search];
        }

        return allMovies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

// Calling the function:
fetchMovies('Batman').then((movies) => {
    console.log(movies);
});