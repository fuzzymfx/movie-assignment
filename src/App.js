import React from 'react';
import './App.css';
import logo from './Assets/Images/logo.png';

function App() {
  const [movies, setMovies] = React.useState([])
  const [movieName, setMovieName] = React.useState('')
  const [moviePoster, setMoviePoster] = React.useState('')
  const [movieOverview, setMovieOverview] = React.useState('')
  const [movieReleaseDate, setMovieReleaseDate] = React.useState('')
  const [movieRating, setMovieRating] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const movielist = [
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
  ]

  React.useEffect(() => {
    movielist.map(async (movie) => {
      console.log(movie)
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${movie}&page=1`
      const response = await fetch(url)
      const data = await response.json()
      setMovies(prevState => [...prevState, data.results[0]])
    })
  }, [])
  console.log(movies)
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <h1>Recent Movies</h1>
        <div className="movies">
          {movies.map((movie, index) => {
            return (
              <div className="movie">
                <div className='movie-card' key={index} onClick={() => {
                  setMovieName(movie.title)
                  setMoviePoster(movie.poster_path)
                  setMovieOverview(movie.overview)
                  setMovieReleaseDate(movie.release_date)
                  setMovieRating(movie.vote_average)
                  setIsLoading(true)
                }
                }
                >
                  <div className='image' style={{
                    backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${movie.poster_path}`})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}>
                  </div>
                  <div >
                    <h5 className='movie-info'>{movie.title}</h5>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/* show modal */}
        {isLoading && (
          <div className="modal">
            <button type="button" className="btn-close" onClick={() => setIsLoading(false)}></button>
            <h5 className="modal-title">{movieName}</h5>
            <div className="modal-content">
              <div >
                <img className="modalposter" src={`https://image.tmdb.org/t/p/w500${moviePoster}`} alt={movieName} />
              </div>
              <div className='modal-body'>
                <span style={{
                  fontWeight: 'bold',
                }}> Release Date:</span> {movieReleaseDate}
                <p >{movieOverview}</p>
                {movieRating}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
