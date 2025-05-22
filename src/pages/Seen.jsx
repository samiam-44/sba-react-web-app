import { useMovieContext } from '../context/MovieContext'; 
import MovieCard from '../components/MovieCard';

export default function Seen() {
  const { seenList } = useMovieContext();

   const seenListMovies = seenList; // Grab only bucketlist movies

  return (
    <div className="page">
      <h1>Ghibli Movies I've Seen</h1>

      {/* If there are no movies in the bucket list*/}
      {seenListMovies.length === 0 ? (
        <p>You haven't added any movies to your SEEN list yet.</p>
      ) : (
        <div className="movie-grid">
          {/* Render MovieCard for each movie in the bucket list */}
          {seenListMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}