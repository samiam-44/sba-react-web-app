import { useEffect, useState } from 'react';
import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY;

export default function usePoster(title, release_date) { //Takes in title and returns poster URL
  const [posterUrl, setPosterUrl] = useState(null); //Stores poster url in state

  useEffect(() => { //this runs upon render/mount
    async function fetchPoster() {
      try {
        const response = await axios.get( //get request to TMDB movie endpoint
          `https://api.themoviedb.org/3/search/movie`,
          { //Query params required by the tmdb api
            params: {
              api_key: TMDB_API_KEY,
              query: title,
              year: release_date,
              include_adult: false,
            },
          }
        );

        const result = response.data.results[0];//returns results array and use the first match
        if (result && result.poster_path) { //if result and poster exist builds img url and saves it in state
          setPosterUrl(`https://image.tmdb.org/t/p/w500${result.poster_path}`);
        } else {
          setPosterUrl(null); //no poster
        }
      } catch (err) { //if error log error and reset url
        console.error(`Failed to fetch poster for "${title}"`, err);
        setPosterUrl(null);
      }
    }

    fetchPoster(); //calls async function to run request
  }, [title]);

  return posterUrl; 
}
