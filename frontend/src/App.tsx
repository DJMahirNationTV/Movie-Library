import { useEffect, useState } from 'react';
import { getAllMovies, type Movie } from './api/movieApi';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]); //speichert kurzzeitig die filmliste im react state
  const [loading, setLoading] = useState<boolean>(true);

  //wenn Seite geladen wird, wird api einmalig aufgerufen
  useEffect(() => {
    getAllMovies()
        .then((data) => {
          setMovies(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Fehler beim Laden der Filme:', error);
          setLoading(false);
        });
  }, []);

  if (loading) return <p>Lade Filme...</p>;

  return (
      <div style={{ padding: '20px' }}>
        <h1>Filmliste</h1>
        {movies.length === 0 ? (
            <p>Keine Filme gefunden.</p>
        ) : (
            <ul>
              {movies.map((movie) => (
                  <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
        )}
      </div>
  );
}

export default App;