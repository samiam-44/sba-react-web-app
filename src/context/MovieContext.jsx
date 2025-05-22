import { createContext, useContext, useReducer } from 'react';

//context object
const MovieContext = createContext()

//Initial global state
const initialState = {
    bucketlist: [], //List of movie to watch
    seenList: [] //Already watched
};

//Reducer function to handle actions 
function movieReducer(state, action) {
    switch (action.type) {
        case 'Add':
            //Prevent duplicates (some())\
            if (state.bucketlist.some(movie => movie.id === action.payload.id)) {
                return state; //no change
            }
            return {
                ...state,
                bucketlist: [...state.bucketlist, action.payload]
            };
        case 'MarkSeen':
            //skip if alrady in seenList
            if (state.seenList.some(movie => movie.id === action.payload.id)) {
                return state;
            }

            return {
                ...state,
                //Remove movie from bucketlist
                bucketlist: state.bucketlist.filter(movie => movie.id !== action.payload.id),
                //add to seenList
                seenList: [...state.seenList, action.payload]
            };
            default:
                return state; 
    }
}

//Provider component
export function MovieProvider({ children }) {
    //useReducer to get current state and dispatch function to update it
    const [state, dispatch] = useReducer(movieReducer, initialState);
    //Action to mark a movie as seen
      const addToBucketlist = (movie) => {
    dispatch({ type: 'Add', payload: movie });
      
};
//Action to mark seen
const markAsSeen = (movie) => {
    dispatch({ type: 'MarkSeen', payload: movie });
};

//Provides state and actions to the whole app
return (
    <MovieContext.Provider value={{
        bucketlist: state.bucketlist,
        seenList: state.seenList,
        addToBucketlist,
        markAsSeen
    }}>
        {children}
        </MovieContext.Provider>
        );
    }

export function useMovieContext() {
    return useContext(MovieContext);
}