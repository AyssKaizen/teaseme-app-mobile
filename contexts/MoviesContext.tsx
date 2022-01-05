import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios'
import {API_KEY} from '../config'

interface ContextProp {
    popularMovies?: any,
    topRatedMovies?: any,
    popularSeries?: any
    currentMovie?: any,
    getMovieByID: (id: string) => void
}

const MoviesContext = createContext<ContextProp>({});
export default MoviesContext;
export const useMovies = () => useContext(MoviesContext);

export const MoviesContextProvider = ({children}:{children: any}) => {
    const [popularMovies, setPopularMovies] = useState<any>([])
    const [popularSeries, setPopularSeries] = useState<any>([])
    const [topRatedMovies, setTopRatedMovies] = useState<any>([])
    const [currentMovie, setCurrentMovie] = useState<any>()
    const API = `?api_key=${API_KEY}`
    const BASE_URL = 'https://api.themoviedb.org/3'
    const TV = '/tv/'
    const MOVIE = '/movie/'
    const POPULAR = 'popular'
    const TOP_RATED = 'top_rated'

    const getMovieByID = async (id: string)  => {
        try {
            const {data} = await axios.get(`${BASE_URL}${MOVIE}${id}${API}&language=fr`)
            setCurrentMovie(data)
        } catch (error) {
            console.error(error)
        }
    }

    const propsContext: ContextProp = {
        popularMovies: popularMovies,
        topRatedMovies: topRatedMovies,
        popularSeries: popularSeries,
        getMovieByID: getMovieByID,
        currentMovie: currentMovie
    }

    const getPopularMovies = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL}${MOVIE}${POPULAR}${API}&language=fr`)
            setPopularMovies(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }
    const getTopRatedMovies = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL}${MOVIE}${TOP_RATED}${API}`)
            setTopRatedMovies(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }
    const getPopularSeries = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL}${TV}${POPULAR}${API}`)
            setPopularSeries(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }
    

    useEffect(()=> {
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