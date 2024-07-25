import { Fragment, useEffect, useRef, useState } from "react";
import StarRating from "./StarRating.js"
import useMovies from "./useMovie.js";
import useLocalStorageState from "./useLocalStorageState.js";
import useKey from "./useKey.js";

/*
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
*/

const API_KEY = "e6d098c";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectId, setSelectedId] = useState(null);

  const [movies, isLoading, error] = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId(selectId => id === selectId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  return (
    <Fragment>
      <NavBar>
        <Logo/>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </NavBar>
      <Main>
        <Box>
          {isLoading ? <Loader/> : error ? <ErrorMessage message={error}/>: <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
        </Box>
        <Box>
          { selectId ? 
            <MovieDetails selectId={selectId} onCloseMovie={handleCloseMovie} onAddWatch={handleAddWatched} watched={watched}/> :
            <Fragment>
              <WatchSummary watched={watched}/>
              <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched}/>
            </Fragment>
          }
        </Box>
      </Main>
    </Fragment>
  );
}

function MovieDetails({selectId, onCloseMovie, onAddWatch, watched}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);
  useKey("Escape", onCloseMovie);

  // keep count of the number of times a user changes their rateing 
  useEffect(() => {
    // prevent incrementing the count when component first mounts 
    if (userRating) {
      countRef.current++;
    }
  }, [userRating]);

  const isWatched = watched.map(movie => movie.imdbID).includes(selectId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectId)?.userRating;

  const {Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre} = movie;

  useEffect(function () {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectId]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current
    }
    onAddWatch(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(function () {
    if (!title) {
      return;
    }
    document.title = `Movie | ${title}`;
    return function () {
      document.title = "usePopcorn";
    }
  }, [title]);

  return (
    <div className="details">
      {isLoading ? <Loader/> :
        <Fragment>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
            <img src={poster} alt={`Poster of ${movie} movie`}/>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐️ {imdbRating} IMDb Rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              { isWatched ? <p>You rated this movie {watchedUserRating} ⭐️</p> :
                <Fragment>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                  {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to List</button>}
                </Fragment>
              }
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </Fragment>
      }
    </div>
  );
}

function Loader(){
  return (
    <p className="loader">
      Loading...
    </p>
  );
}

function ErrorMessage({message}) {
  return (
    <p className="error">{message}</p>
  );
}

function NavBar({children}) {

  return (
    <nav className="nav-bar">
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({query, setQuery}) {
  const inputEl = useRef(null);

  useKey("Enter", () => {
			// we don't want to do anything if the search field is already active
			if (document.activeElement === inputEl.current) {
				return;
			}
      inputEl.current.focus();
      setQuery("");
  });

  return (
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl}
  />
  );
}

function NumResults({movies}) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({children}) {
  return (
    <main className="main">
      {children}
    </main>
  );
}

function Box({children}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({movies, onSelectMovie}) {
  return (
    <ul className="list list-movies">
      {movies?.map(movie => <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie}/>)}
    </ul>
  );
}

function Movie({movie, onSelectMovie}) {

  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchSummary({watched}) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({watched, onDeleteWatched}) {
  return (
    <ul className="list">
      {watched.map(movie => <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched}/>)}
    </ul>
  );
}

function WatchedMovie({movie, onDeleteWatched}) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}