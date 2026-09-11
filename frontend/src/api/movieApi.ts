import api from './axios';

// Interface für deinen Film definieren
export interface Movie {
    id?: string; //mit ? damit kein Fehler wenn leer
    title: string;
    year: string;
    poster?: string; //mit ? damit kein Fehler wenn leer
}

interface omdbSearchItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

interface omdbSearchResponse {
    Search?: omdbSearchItem[];
    totalResults?: string;
    Response: string;
    Error?: string;
}

// GET: Alle Filme vom Backend abrufen
// weil api aufruf lange dauert, warte einen moment und blockier nicht,
// eine ein array movie wir aufgerufen
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await api.get<omdbSearchResponse>('/movies/omdb/search', {
      params: { query },
    });

    if (response.data.Response === 'False' || !response.data.Search) {
      return [];
    }

    // Wandelt OMDb PascalCase (Title, Poster) in dein Frontend Movie Interface um
    return response.data.Search.map((item) => ({
      id: item.imdbID,
      title: item.Title,
      year: item.Year,
      poster: item.Poster !== 'N/A' ? item.Poster : undefined,
    }));
  } catch (error) {
    console.error('Fehler bei der Filmsuche:', error);
    return [];
  }
};

// 2. Alle gespeicherten Filme aus der eigenen Datenbank abrufen
export const getAllMovies = async (): Promise<Movie[]> => {
  const response = await api.get<Movie[]>('/movies/all');
  return response.data;
};

// 3. Einen Film in der eigenen Datenbank speichern (z.B. Watchlist)
export const saveMovie = async (movie: Movie): Promise<Movie> => {
  const response = await api.post<Movie>('/movies', movie);
  return response.data;
};