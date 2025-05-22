import { useMovieContext } from '../context/MovieContext'; 
import MovieCard from '../components/MovieCard';

export default function Bucketlist() {
  const { bucketlist } = useMovieContext();

   const bucketlistMovies = bucketlist; // Grab only bucketlist movies

  return (
    <div className="page">
      <h1>My Ghibli Movie Bucket List</h1>

      {/* If there are no movies in the bucket list*/}
      {bucketlistMovies.length === 0 ? (
        <p>You haven't added any movies to your bucket list yet.</p>
      ) : (
        <div className="movie-grid">
          {/* Render MovieCard for each movie in the bucket list */}
          {bucketlistMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}