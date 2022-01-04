import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios'

const MoviesContext = createContext({});
export default MoviesContext;
export const useMovies = () => useContext(MoviesContext);

export const MoviesContextProvider = ({children}:{children: any}) => {
    const [movies, setMovies] = useState<any>([])
    const [movie, setMovie] = useState<any>({})
    const API_KEY = '?api_key=bd8ddc22c4bf84e8bc799c5062ef30d2'
    const BASE_URL = 'https://api.themoviedb.org/3/movie/'
    const POPULAR_MOVIE = 'popular'

    const getMovie = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL}566525${API_KEY}`)
            setMovie(res.data)
            
        } catch (error) {
            console.error(error)
        }
    }
    const getMovies = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL}${POPULAR_MOVIE}${API_KEY}&page=1`)
            setMovies(res.data.results)
            //console.log(res.data.results);
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=> {
        getMovie()
        getMovies()
    },[])

    return (
        <MoviesContext.Provider
        value={{
            movies
          }}
        >
            {children}
        </MoviesContext.Provider>
    )
    

}