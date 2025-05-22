import { useState } from 'react';
import usePoster from '../hooks/usePoster';
import { useMovieContext } from '../context/MovieContext';


export default function MovieCard({ movie }) {
  // Local state to track whether to show full description
  const [showFull, setShowFull] = useState(false);
  const posterUrl = usePoster(movie.title, movie.release_date);//Hook to fetch poster based on movie title also needs to be inside function so it renders with function
  //Destructured context values like functions and global state lists
  const {
    addToBucketlist,
    bucketlist,
    seenList,
    toggleSeen
  } = useMovieContext();

  //Check if movie is already in the bucketlist
  const isInBucketlist = bucketlist.some((m) => m.id === movie.id);

  //check if movie has already been marked as seen
  const isSeen = seenList.some((m) => m.id === movie.id);

  // Toggle description display when button is clicked
  const toggleDescription = () => {
    setShowFull(prev => !prev);
  };

  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      {/* Render the poster if found*/}
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="poster-img"
        />
      ) : (
        <p>No poster available</p>
      )}
      <h3>{movie.original_title}</h3>
      <h4>Release Date: {movie.release_date}</h4>
      <h4>Run Time: {movie.running_time} minutes</h4>
      <h4>Rotten Tomato Score: {movie.rt_score}</h4>
      <h4>Director: {movie.director}</h4>
      <p>
        {/* Show full or trimmed description based on state */}
        {showFull
          ? movie.description
          : `${movie.description.substring(0, 150)}...`}
      </p>

      {/* Button to toggle description */}
      <button onClick={toggleDescription}>
        {showFull ? 'Show Less' : 'Read More'}
      </button>
      {/* Add to Bucketlist */}
      <button
        onClick={() => addToBucketlist(movie)}
        disabled={isInBucketlist}
      >
        {isInBucketlist ? 'Added to Bucketlist' : 'Add to Bucketlist'}
      </button>

      {/* Toggle Seen  */}
      <button onClick={() => toggleSeen(movie)}>
        {isSeen ? 'Not Seen' : 'Seen'}
      </button>

      {/* Seen tag */}
      {isSeen && <p><em>SEEN</em></p>}

      
    </div>
  );
}
