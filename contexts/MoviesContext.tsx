import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios'

interface ContextProp {
    popularMovies?: any,
    topRatedMovies?: any,
    movie?: any,
    popularSeries?: any
}

const MoviesContext = createContext<ContextProp>({});
export default MoviesContext;
export const useMovies = () => useContext(MoviesContext);

export const MoviesContextProvider = ({children}:{children: any}) => {
    const [popularMovies, setPopularMovies] = useState<any>([])
    const [popularSeries, setPopularSeries] = useState<any>([])
    const [topRatedMovies, setTopRatedMovies] = useState<any>([])
    const [movie, setMovie] = useState<any>({})
    const API_KEY = '?api_key=bd8ddc22c4bf84e8bc799c5062ef30d2'
    const BASE_URL_MOVIE = 'https://api.themoviedb.org/3/movie/'
    const BASE_URL_TV = 'https://api.themoviedb.org/3/tv/'
    const POPULAR_MOVIE = 'popular'
    const TOP_RATED = 'top_rated'

    const propsContext: ContextProp = {
        popularMovies: popularMovies,
        movie: movie, 
        topRatedMovies: topRatedMovies,
        popularSeries: popularSeries
    }

    const getMovie = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL_MOVIE}566525${API_KEY}`)
            setMovie(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    const getPopularMovies = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL_MOVIE}${POPULAR_MOVIE}${API_KEY}`)
            setPopularMovies(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }
    const getTopRatedMovies = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL_MOVIE}${TOP_RATED}${API_KEY}`)
            setTopRatedMovies(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }
    const getPopularSeries = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL_TV}${POPULAR_MOVIE}${API_KEY}`)
            setPopularSeries(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }
    

    useEffect(()=> {
        getMovie()
        getPopularMovies()
        getTopRatedMovies()
        getPopularSeries()
    },[])

    return (
        <MoviesContext.Provider
            value={propsContext} 
        >
            {children}
        </MoviesContext.Provider>
    )
    

}