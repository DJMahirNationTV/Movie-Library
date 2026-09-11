import { useEffect, useState, type FormEvent } from "react";
import {
  getAllMovies,
  getMovieDetails,
  searchMovies,
  type Movie,
  type MovieDetails,
} from "./api/movieApi";

function MoviePoster({
  src,
  title,
  large = false,
}: {
  src?: string;
  title: string;
  large?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const size = large ? "aspect-[2/3] w-full" : "h-28 w-20";
  if (!src || src === "N/A" || hasError)
    return (
      <div
        className={`${size} flex items-center justify-center rounded-lg border border-white/10 bg-stone-800 text-center text-xs text-stone-500`}
      >
        Kein Bild
      </div>
    );
  return (
    <img
      src={src}
      alt={title}
      onError={() => setHasError(true)}
      className={`${size} rounded-lg object-cover shadow-lg`}
    />
  );
}

function DetailStat({ label, value }: { label: string; value?: string }) {
  if (!value || value === "N/A") return null;
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-stone-200">{value}</dd>
    </div>
  );
}

function MovieDetail({
  movie,
  onBack,
}: {
  movie: MovieDetails;
  onBack: () => void;
}) {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-16 pt-6 sm:px-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-stone-400 transition hover:text-amber-300"
      >
        <span aria-hidden="true">←</span> Zurück
      </button>
      <section className="grid gap-8 md:grid-cols-[240px_1fr] md:gap-12">
        <div className="mx-auto w-52 md:mx-0 md:w-full">
          <MoviePoster src={movie.Poster} title={movie.Title} large />
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            {movie.Type} · {movie.Year}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-stone-100 sm:text-6xl">
            {movie.Title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-400">
            {movie.Plot}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {movie.Genre.split(", ").map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-stone-300"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-white/10 py-6 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold text-amber-300">
                {movie.imdbRating}
              </p>
              <p className="text-xs text-stone-500">IMDb Bewertung</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-100">
                {movie.Runtime}
              </p>
              <p className="text-xs text-stone-500">Laufzeit</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-100">{movie.Rated}</p>
              <p className="text-xs text-stone-500">Freigabe</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-100">
                {movie.Metascore}
              </p>
              <p className="text-xs text-stone-500">Metascore</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-12 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-[1fr_280px]">
        <dl className="grid gap-6 sm:grid-cols-2">
          <DetailStat label="Regisseur" value={movie.Director} />
          <DetailStat label="Schauspieler" value={movie.Actors} />
          <DetailStat label="Schreiber" value={movie.Writer} />
          <DetailStat label="Released" value={movie.Released} />
          <DetailStat label="Sprache" value={movie.Language} />
          <DetailStat label="Drehorte" value={movie.Country} />
          <DetailStat label="Auszeichnungen" value={movie.Awards} />
          <DetailStat label="Box office" value={movie.BoxOffice} />
        </dl>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            Bewertungen
          </h2>
          <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {movie.Ratings.map((rating) => (
              <div
                key={rating.Source}
                className="flex justify-between gap-4 py-3 text-sm"
              >
                <span className="text-stone-400">{rating.Source}</span>
                <strong className="text-stone-100">{rating.Value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  const loadSavedMovies = () => {
    setLoading(true);
    setIsSearching(false);
    setError("");
    getAllMovies()
      .then(setMovies)
      .catch(() => setError("Die Bibliothek konnte nicht geladen werden."))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getAllMovies()
      .then(setMovies)
      .catch(() => setError("Die Bibliothek konnte nicht geladen werden."));
  }, []);
  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    setLoading(true);
    setIsSearching(true);
    setError("");
    try {
      setMovies(await searchMovies(query));
    } catch {
      setError("Die Suche konnte nicht abgeschlossen werden.");
    } finally {
      setLoading(false);
    }
  };
  const openMovie = async (movie: Movie) => {
    if (!movie.id) return;
    setDetailLoading(true);
    setError("");
    try {
      setSelectedMovie(await getMovieDetails(movie.id));
    } catch {
      setError("Die Filmdetails konnten nicht geladen werden.");
    } finally {
      setDetailLoading(false);
    }
  };
  if (selectedMovie)
    return (
      <MovieDetail
        movie={selectedMovie}
        onBack={() => setSelectedMovie(null)}
      />
    );

  return (
    <main className="mx-auto max-w-5xl px-5 pb-16 pt-12 sm:px-8 sm:pt-20">
      <header className="mb-12 max-w-2xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-amber-400">
          Movie Library
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-stone-100 sm:text-6xl">
          Deine Filme.
          <br />
          <span className="text-stone-500 text-3xl">
            Gönn dir bisschen Popcorn.
          </span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-stone-400">
          Durchsuche deine Sammlung oder entdecke deinen nächsten Film.
        </p>
      </header>
      <form
        onSubmit={handleSearch}
        className="mb-10 flex flex-col gap-3 sm:flex-row"
      >
        <label className="sr-only" htmlFor="movie-search">
          Film suchen
        </label>
        <input
          id="movie-search"
          type="search"
          placeholder="Film, Schauspieler oder Titel suchen ..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="min-h-12 flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-4 text-sm text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/10"
        />
        <button
          type="submit"
          disabled={loading}
          className="min-h-12 rounded-lg cursor-pointer bg-amber-400 px-6 text-sm font-bold text-stone-950 transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Lädt ..." : "Suchen"}
        </button>
        {isSearching && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              loadSavedMovies();
            }}
            className="min-h-12 rounded-lg cursor-pointer border border-white/10 px-5 text-sm font-semibold text-stone-300 transition hover:border-white/25 hover:text-white"
          >
            Zurück
          </button>
        )}
      </form>
      <div className="mb-5 flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
            {isSearching ? "Suchergebnisse" : "Deine Sammlung"}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-stone-100">
            {isSearching
              ? `${movies.length} Treffer`
              : `${movies.length} Filme`}
          </h2>
        </div>
      </div>
      {error && (
        <p className="mb-5 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}
      {loading ? (
        <div
          className="grid grid-cols-2 gap-4 rounded-[22px] border border-white/15 bg-black/20 p-4 sm:grid-cols-3 sm:gap-5 sm:p-6 lg:grid-cols-4 lg:gap-6 lg:p-8"
          aria-label="Filme werden geladen"
        >
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="aspect-[2/3] animate-pulse rounded-[22px] border-2 border-white/10 bg-white/[0.06]"
            />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <p className="py-12 text-center text-sm text-stone-500">
          {isSearching
            ? "Keine Filme zu diesem Suchbegriff gefunden."
            : "Noch keine Filme in deiner Bibliothek gespeichert."}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 rounded-[22px] border border-white/15 bg-black/20 p-4 sm:grid-cols-3 sm:gap-5 sm:p-6 lg:grid-cols-4 lg:gap-6 lg:p-8">
          {movies.map((movie) => (
            <button
              type="button"
              key={movie.id ?? movie.title}
              onClick={() => openMovie(movie)}
              disabled={detailLoading}
              className="group relative cursor-pointer aspect-[2/3] w-full overflow-hidden rounded-[20px] border-stone-200/80 bg-stone-900 text-center transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_16px_35px_rgba(0,0,0,0.35)] disabled:cursor-wait"
            >
              <MoviePoster src={movie.poster} title={movie.title} large />
              <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/65 to-transparent px-4 pb-4 pt-20">
                <span className="block line-clamp-2 text-sm font-semibold leading-tight text-white transition group-hover:text-amber-200 sm:text-base">
                  {movie.title}
                </span>
                <span className="mt-1 block text-xs text-stone-300">
                  {movie.year}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
