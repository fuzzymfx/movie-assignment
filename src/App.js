import React from "react";
import "./App.css";
import logo from "./Assets/Images/logo.png";
import search from "./Assets/Images/search-symbol.png";
function App() {
  const [movies, setMovies] = React.useState([]);
  const [movieName, setMovieName] = React.useState("");
  const [moviePoster, setMoviePoster] = React.useState("");
  const [movieOverview, setMovieOverview] = React.useState("");
  const [movieReleaseDate, setMovieReleaseDate] = React.useState("");
  const [movieRating, setMovieRating] = React.useState("");
  const [movieTotalVotes, setMovieTotalVotes] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [movielist, setMovielist] = React.useState([
    "Cruella",
    "The Unholy",
    "Army of the Dead",
    "Wrath of Man",
    "Mortal Kombat",
    "I Am All Girls",
    "Tom Clancy's Without Remorse",
    "Godzilla vs. Kong",
    "Those Who Wish Me Dead",
    "The Virtuoso",
    "Nobody",
    "Demon Slayer: Kimetsu no Yaiba: The Movie: Mugen Train",
  ]);

  React.useEffect(() => {
    if (searchTerm === "") {
      movielist.map(async (movie) => {
        console.log(movie);
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${movie}&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        setMovies((prevState) => [...prevState, data.results[0]]);
      });
    }
  }, [movielist, searchTerm]);
  React.useEffect(() => {
    const search = async () => {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&page=1`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    };
    if (searchTerm) {
      search();
    }
  }, [movies, searchTerm]);
  console.log(movies);
  return (
    <>
      <div className="container">
        <div className="header">
          <a href="/movie-assignment" className="logo">
            <img src={logo} alt="logo" />
          </a>
          <div className="search-bar">
            <img src={search} className="search-bar-img" alt="search" />
            <input type="text" placeholder="Search for a movie"
              onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <h2>Most Recent Movies</h2>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div className="movies">
            {movies.map((movie, index) => {
              return (
                <div className="movie">
                  <div
                    className="movie-card"
                    key={index}
                    onClick={() => {
                      setMovieName(movie.title);
                      setMoviePoster(movie.poster_path);
                      setMovieOverview(movie.overview);
                      setMovieReleaseDate(movie.release_date);
                      setMovieRating(movie.vote_average);
                      setMovieTotalVotes(movie.vote_count);
                      setIsLoading(true);
                    }}
                  >
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${movie.poster_path}`})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100%",
                      }}
                    >

                      <div className="rating">
                        <span>{movie.vote_average}</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="movie-info">{movie.title}</h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* show modal */}
        {isLoading && (
          <div className="modal-container">
            <div className="modal">
              <div className="modal-header">
                <h3 className="modal-title">{movieName}</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsLoading(false)}
                ></button>
              </div>
              <div className="modal-content">
                <div>
                  <img
                    className="modalposter"
                    src={`https://image.tmdb.org/t/p/w500${moviePoster}`}
                    alt={movieName}
                  />
                </div>
                <div className="modal-body">
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Release Date:
                  </span>{" "}
                  {movieReleaseDate}
                  <p>{movieOverview}</p>
                  <span>
                    <b>{movieRating}</b>/ 10 ({movieTotalVotes} total votes)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;