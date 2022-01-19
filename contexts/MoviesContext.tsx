import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios'
import {API_KEY} from '../config'

interface ContextProp {
    popularMovies?: any,
    topRatedMovies?: any,
    popularSeries?: any
    currentMovie?: any,
    seriesOnTheAir?: any,
    topRatedSeries?: any,
    currentVideo?: any,
    getSerieByID: (id: string) => void
    getMovieByID: (id: string) => void
    getMovieVideoByID: (id: string) => void
    getMediasBySearchText: (searchText: string) => Promise<any[]>
}

const MoviesContext = createContext<ContextProp>({});
export default MoviesContext;
export const useMovies = () => useContext(MoviesContext);

export const MoviesContextProvider = ({children}:{children: any}) => {
    const [popularMovies, setPopularMovies] = useState<any>([])
    const [popularSeries, setPopularSeries] = useState<any>([])
    const [topRatedMovies, setTopRatedMovies] = useState<any>([])
    const [seriesOnTheAir, setSeriesOnTheAir] = useState<any>([])
    const [topRatedSeries, setTopRatedSeries] = useState<any>([])
    const [currentMovie, setCurrentMovie] = useState<any>()
    const [currentVideo, setCurrentVideo] = useState<any>()
    const API = `?api_key=${API_KEY}`
    const BASE_URL = 'https://api.themoviedb.org/3'
    const TV = '/tv/'
    const MOVIE = '/movie/'
    const POPULAR = 'popular'
    const TOP_RATED = 'top_rated'
    const ON_THE_AIR = 'on_the_air'
    const VIDEOS = '/videos'
    const SEARCH_MULTI = '/search/multi'

    const getMovieByID = async (id: string)  => {
        try {
            const {data} = await axios.get(`${BASE_URL}${MOVIE}${id}${API}&language=fr`)
            setCurrentMovie(data)
        } catch (error) {
            console.error(error)
        }
    }
    const getSerieByID = async (id: string)  => {
        try {
            const {data} = await axios.get(`${BASE_URL}${TV}${id}${API}&language=fr`)
            setCurrentMovie(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getMovieVideoByID = async (id: string)  => {
        try {
            const {data} = await axios.get(`${BASE_URL}${MOVIE}${id}${VIDEOS}${API}&language=fr`)
            setCurrentVideo(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getMediasBySearchText = async (searchText: string) => {
        try {
         return await axios.get(`${BASE_URL}${SEARCH_MULTI}${API}&language=fr&query=${searchText}`)
            .then((response)=> {
                return response.data.results
            })
        } catch (error) {
            console.error(error)
        }
    }

    const propsContext: ContextProp = {
        popularMovies: popularMovies,
        topRatedMovies: topRatedMovies,
        popularSeries: popularSeries,
        getMovieByID: getMovieByID,
        currentMovie: currentMovie,
        getSerieByID: getSerieByID,
        seriesOnTheAir: seriesOnTheAir,
        topRatedSeries: topRatedSeries,
        currentVideo: currentVideo,
        getMovieVideoByID: getMovieVideoByID,
        getMediasBySearchText: getMediasBySearchText
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
            const res : any = await axios.get<any>(`${BASE_URL}${MOVIE}${TOP_RATED}${API}&language=fr`)
            setTopRatedMovies(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }
    const getPopularSeries = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL}${TV}${POPULAR}${API}&language=fr`)
            setPopularSeries(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }
    const getSeriesOnTheAir = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL}${TV}${ON_THE_AIR}${API}&language=fr`)
            setSeriesOnTheAir(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }

    const getTopRateSeries = async () => {
        try {
            const res : any = await axios.get<any>(`${BASE_URL}${TV}${TOP_RATED}${API}&language=fr`)
            setTopRatedSeries(res.data.results)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=> {
        getPopularMovies()
        getTopRatedMovies()
        getPopularSeries()
        getSeriesOnTheAir()
        getTopRateSeries()
    },[])

    return (
        <MoviesContext.Provider
            value={propsContext} 
        >
            {children}
        </MoviesContext.Provider>
    )
    

}