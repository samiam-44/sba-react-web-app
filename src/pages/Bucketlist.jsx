import { Link } from 'react-router-dom'; // if using react-router
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Bucketlist() {
  const { bucketlist } = useMovieContext();

  return (
    <div className="page">
      <h1>My Ghibli Movie Bucket List</h1>

      {bucketlist.length === 0 ? (
        <p>You haven't added any movies to your bucket list yet.</p>
      ) : (
        <div className="movie-grid">
          {bucketlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <Link to="/">← Back to Home</Link>
    </div>
  );
}
