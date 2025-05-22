import { useState } from 'react';
import usePoster from '../hooks/usePoster';
import { useMovieContext } from '../context/MovieContext';


export default function MovieCard({ movie }) {
  // Local state to track whether to show full description
  const [showFull, setShowFull] = useState(false);
  // Local state to track comment input
  const [commentInput, setCommentInput] = useState('');
//rating
  const [rating, setRating] = useState(0);
  const posterUrl = usePoster(movie.title, movie.release_date); //Hook to fetch poster based on movie title also needs to be inside function so it renders with function

  //Destructured context values like functions and global state lists
  const {
    addToBucketlist,
    bucketlist,
    seenList,
    toggleSeen,
    addComment
  } = useMovieContext();

  //Check if movie is already in the bucketlist
  const isInBucketlist = bucketlist.some((m) => m.id === movie.id);

  //check if movie has already been marked as seen
  const isSeen = seenList.some((m) => m.id === movie.id);

  //Add comment option if movie is found in seen list 
  const currentSeen = seenList.find((m) => m.id === movie.id);
  const savedComment = currentSeen?.comment || '';
  const savedRating = currentSeen?.rating || 0;
  //Save comment and rating to global state
  const handleCommentSubmit = () => {
    addComment(movie.id, commentInput);
    setCommentInput(''); // clear after saving
    setRating(0)
  };

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

      {/* Comment box only visible if movie is marked as seen */}
      {isSeen && (
        <div className="comment-box">
          <textarea
            rows="3"
            placeholder="Leave a review..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Post Review</button>
          {savedComment && (
            <p><strong>Your Review:</strong> {savedComment}</p>
          )}
        </div>
      )}
    </div>
  );
}
