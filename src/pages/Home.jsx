import { useEffect, useState } from 'react';
import axios from 'axios'
import MovieCard from '../components/MovieCard'

export default function Home() {
   const [movies, setMovies] = useState([]); //Local state to store the movies from the Ghibli api
   //Fetch movies when component mounts
   useEffect(() => { //UseEffect runs after component first renders. Runs API call once on mount
      axios.get('https://ghibliapi.vercel.app/films')
         .then(response => {  //After fetch then
            setMovies(response.data); //Stores the api response in state
         })
         .catch(error => {
            console.error('There was an error fetching movies:', error);
         })
   }, []); //Empty array as second argument tells useEffect to run once

   return (
      <div>
         <h1>Ghibli Shelf</h1>
         {movies.length === 0 ? ( //if array is still empty data isnt fully loaded yet
            <p>Loading movies...</p>
         ) : ( //otherwise movies render
            <div className='movie-grid'>
               {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} /> //renders card for each movie and passes whole movie object as a prop
               ))}

            </div>
         )}
      </div>
   );
}
