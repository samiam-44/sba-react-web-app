import { createContext, useContext, useReducer } from 'react';

//context object
const MovieContext = createContext()

//Initial global state
const initialState = {
    bucketlist: [], //List of movie to watch
    seenList: [] //Already watched
};

//Reducer function to handle all actions 
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
        case 'ToggleSeen':
            const isSeen = state.seenList.some(movie => movie.id === action.payload.id);
            return {
                seenList: isSeen
                    ? state.seenList.filter(movie => movie.id !== action.payload.id) // remove from seen
                    : [...state.seenList, action.payload], // add to seen
                bucketlist: isSeen
                    ? [...state.bucketlist, action.payload] // add back to bucketlist
                    : state.bucketlist.filter(movie => movie.id !== action.payload.id) // remove from bucketlist
            }
        case 'AddComment':
            return {
                ...state,
                seenList: state.seenList.map(movie =>
                    movie.id === action.payload.id
                        ? { ...movie, comment: action.payload.comment }
                        : movie
                )
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
    const toggleSeen = (movie) => {
        dispatch({ type: 'ToggleSeen', payload: movie });
    };
    //Action to leave review for every movie
    const addComment = (id, comment) => {
        dispatch({ type: 'AddComment', payload: { id, comment } });
    };



    //Provides state and actions to the whole app
    return (
        <MovieContext.Provider value={{
            bucketlist: state.bucketlist,
            seenList: state.seenList,
            addToBucketlist,
            markAsSeen,
            toggleSeen,
            addComment
        }}>
            {children}
        </MovieContext.Provider>
    );
}

export function useMovieContext() {
    return useContext(MovieContext);
}