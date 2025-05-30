import { useState } from 'react';
import usePoster from '../hooks/usePoster';
import { useMovieContext } from '../context/MovieContext';

export default function MovieCard({ movie }) {
  // Local state to track whether to show full description
  const [showFull, setShowFull] = useState(false);
  // Local state to track comment input
  const [commentInput, setCommentInput] = useState('');
  // Local state to track star rating selection
  const [rating, setRating] = useState(0);

  const posterUrl = usePoster(movie.title, movie.release_date); //Hook to fetch poster based on movie title also needs to be inside function so it renders with function

  //context values
  const {
    toggleBucketlist,
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
    addComment(movie.id, commentInput, rating); // Pass rating to context
    setCommentInput(''); // clear after saving
    setRating(0); // clear rating after saving
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

  {/* Toggle Add/Remove from Bucketlist */}
    <button onClick={() => toggleBucketlist(movie)}>
      {isInBucketlist ? 'Remove from Bucketlist' : 'Add to Bucketlist'}
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
            rows="4"
            placeholder="Leave a review..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />

          {/* Star Rating UI */}
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)} // Set selected rating
                style={{
                  cursor: 'pointer',
                  color: star <= rating ? '#ffc107' : '#ccc',
                  fontSize: '20px'
                }}
              >
                ★
              </span>
            ))}
          </div>

          <button onClick={handleCommentSubmit}>Post Review</button>

          {savedComment && (
            <p><strong>Your Review:</strong> {savedComment}</p>
          )}

          {savedRating > 0 && (
            <p>
              <strong>Your Rating:</strong>{' '}
              {[...Array(savedRating)].map((_, i) => (
                <span key={i} style={{ color: '#ffc107' }}>★</span>
              ))}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

