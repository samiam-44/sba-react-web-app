import { useEffect, useState } from 'react';
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import Carousel from '../components/Carousel';
export default function Home() {
   const [movies, setMovies] = useState([]); //Local state to store the movies from the Ghibli api
   //Fetch movies when component mounts
   useEffect(() => { //UseEffect runs after component first renders. Runs API call once on mount
      axios.get('https://ghibliapi.vercel.app/films')
         .then(response => {  //After fetch then
           const ghibliMovies = response.data;
           //Manually added the boy and the heron since it not inlcuded in the api
                  const newMovie = {
          id: 'boy-and-heron', 
          title: 'The Boy and the Heron',
          description: `After losing his mother during the war, young Mahito moves to his family's estate in the countryside. There, a series of mysterious events lead him to a secluded and ancient tower, home to a mischievous gray heron. When Mahito's new stepmother disappears, he follows the gray heron into the tower, and enters a fantastic world shared by the living and the dead. As he embarks on an epic journey with the heron as his guide, Mahito must uncover the secrets of this world, and the truth about himself.`,
          release_date: '2023',
          original_title: '君たちはどう生きるか',
          running_time: '124',
          rt_score: '96',
          director: 'Hayao Miyazaki'
        };
        //Fetched movies and new movie combined
        const allMovies = [...ghibliMovies, newMovie];

        setMovies(allMovies); //Store updated movie list in state
         })
         .catch(error => {
            console.error('There was an error fetching movies:', error);
         })
   }, []); //Empty array as second argument tells useEffect to run once

   return (
      <div>
         <h1> My Ghibli Shelf</h1>
         {movies.length === 0 ? ( //if array is still empty data isnt fully loaded yet
            <p>Loading movies...</p>
         ) : ( //otherwise movies render
           
            <div className='movie-grid'>
               <Carousel>
               {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} /> //renders card for each movie and passes whole movie object as a prop
                
               ))}
            </Carousel>
            </div>
            
         )}
      </div>
   );
}
