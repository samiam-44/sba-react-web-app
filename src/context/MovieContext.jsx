import { createContext, useContext, useReducer } from 'react';

// context object
const MovieContext = createContext();

// Initial global state
const initialState = {
  bucketlist: [], // List of movies to watch
  seenList: [] // Already watched
};

// Reducer function to handle all actions
function movieReducer(state, action) {
  switch (action.type) {
    case 'Add':
      if (state.bucketlist.some(movie => movie.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        bucketlist: [...state.bucketlist, action.payload]
      };
    case 'MarkSeen':
      if (state.seenList.some(movie => movie.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        bucketlist: state.bucketlist.filter(movie => movie.id !== action.payload.id),
        seenList: [...state.seenList, action.payload]
      };
    case 'ToggleSeen':
      const isSeen = state.seenList.some(movie => movie.id === action.payload.id);
      return {
        seenList: isSeen
          ? state.seenList.filter(movie => movie.id !== action.payload.id)
          : [...state.seenList, action.payload],
        bucketlist: isSeen
          ? [...state.bucketlist, action.payload]
          : state.bucketlist.filter(movie => movie.id !== action.payload.id)
      };
    case 'AddComment':
      return {
        ...state,
        seenList: state.seenList.map(movie =>
          movie.id === action.payload.id
            ? { ...movie, comment: action.payload.comment, rating: action.payload.rating }
            : movie
        )
      };
    default:
      return state;
  }
}

function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const addToBucketlist = (movie) => {
    dispatch({ type: 'Add', payload: movie });
  };

  const markAsSeen = (movie) => {
    dispatch({ type: 'MarkSeen', payload: movie });
  };

  const toggleSeen = (movie) => {
    dispatch({ type: 'ToggleSeen', payload: movie });
  };

  const addComment = (movieId, comment, rating = 0) => {
    dispatch({
      type: 'AddComment',
      payload: { id: movieId, comment, rating }
    });
  };

  return (
    <MovieContext.Provider
      value={{
        bucketlist: state.bucketlist,
        seenList: state.seenList,
        addToBucketlist,
        markAsSeen,
        toggleSeen,
        addComment
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

function useMovieContext() {
  return useContext(MovieContext);
}


export { MovieProvider, useMovieContext };
