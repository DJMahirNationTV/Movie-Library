import { useEffect, useState, type FormEvent } from 'react';
import { getAllMovies, searchMovies, type Movie } from './api/movieApi';

// Falls es kein Poster bzw. 404 Error, dann wird es quasi einfach "Kein Bild" angezeigt
function MoviePoster({ src, title }: { src?: string; title: string }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        style={{
          width: '60px',
          minWidth: '60px',
          height: '90px',
          backgroundColor: '#2a2a2a',
          color: '#888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          textAlign: 'center',
          borderRadius: '4px',
          border: '1px solid #444',
          padding: '4px',
          boxSizing: 'border-box',
        }}
      >
        Kein Bild
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      onError={() => setHasError(true)}
      style={{
        width: '60px',
        minWidth: '60px',
        height: '90px',
        objectFit: 'cover',
        borderRadius: '4px',
      }}
    />
  );
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Beim ersten Laden der Seite: Gespeicherte Filme aus der DB holen

  const loadSavedMovies = () => {
    setLoading(true);
    setIsSearching(false);
    getAllMovies() // das ist die Startseite (Ohne search)
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error('Fehler beim Laden der gespeicherten Filme:', error);
      })
      .finally(() => {
        setLoading(false); // Schritt eins= der macht false (also der laded nix)
      });
  };

  useEffect(() => {
    loadSavedMovies();
    console.log('test');
  }, []);

  // Suche in der OMDb über dein Spring Boot Backend ausführen
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setLoading(true); // Schritt zwei= der macht true (also der laded etwas)
    setIsSearching(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error('Fehler bei der Filmsuche:', error);
      setMovies([]);
    } finally {
      setLoading(false); // Schritt drei= der macht false (also der laded nix mehr, weil er fertig ist)
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>{isSearching ? 'Suchergebnisse' : 'Meine Film-Bibliothek'}</h1>

      {/* Suchleiste */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Suche nach Filmen (z. B. Spiderman, Batman)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '6px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
          }}
        >
          {loading ? 'Lade...' : 'Suchen'}
        </button>

        {isSearching && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              loadSavedMovies();
            }}
            style={{
              padding: '10px 16px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '6px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
            }}
          >
            Zurück zur Bibliothek
          </button>
        )}
      </form>

      {/* Ergebnisliste / Bibliotheksliste */}
      <section>
        {loading ? (
          <p>Lade Filme...</p>
        ) : movies.length === 0 ? (
          <p>{isSearching ? 'Keine Filme zu diesem Suchbegriff gefunden.' : 'Noch keine Filme in deiner Bibliothek gespeichert.'}</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
            {movies.map((movie) => (
              <li
                key={movie.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                }}
              >
                {<MoviePoster src={movie.poster} title={movie.title} />}
                <div>
                  <h3 style={{ margin: '0 0 4px 0' }}>{movie.title}</h3>
                  {movie.year && <p style={{ margin: 0, color: '#666' }}>Erscheinungsjahr: {movie.year}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;