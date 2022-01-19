import React,{useEffect, useState} from 'react'
import { ScrollView, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import { RootTabScreenProps } from '../types';
import  {useMovies}  from '../contexts/MoviesContext';
import { TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import MovieListItem from '../components/MovieListItem';

export default function HomeScreeen({ navigation }: RootTabScreenProps<'Home'>) {
  const img = require('../assets/images/background.jpeg')
  const apiMovieCtx = useMovies()
  const [text, setText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>()
  const {popularMovies,popularSeries,topRatedMovies, seriesOnTheAir, topRatedSeries} = apiMovieCtx

  const openDetails = (id: string, isSerie?: boolean) => {
    !isSerie ?  navigation.navigate('Details', {id: id})
    : navigation.navigate('Details', {id: id, isSerie: true})
  }
  
  useEffect(()=> {
    if((popularMovies || popularSeries || topRatedSeries || topRatedMovies || seriesOnTheAir).length <= 0)
      setIsLoading(true)
    else setTimeout(()=> {
      setIsLoading(false)
    },1000) 
  })

  return (
  <ScrollView>
    <ImageBackground resizeMode='repeat' style={{width: '100%', minHeight:800}}  source={img}>
        {!isLoading ?
        <>
          <TextInput
            placeholder='Taper un film ou une serie'
            value={text}
            onChangeText={text => setText(text)}
            style={{marginHorizontal: 20, marginVertical: 10, height:45}}
            autoComplete
            activeUnderlineColor='#FA4B7C'
            right={<TextInput.Icon name='magnify' style={{zIndex: 4}} onPress={()=> {navigation.navigate('SearchScreen', {searchText: text})}}/>}
          />
          <ScrollView>
            <MovieListItem isSerie={false} title='Films populaires' medias={popularMovies} openDetails={openDetails} />
            <MovieListItem isSerie={false} title='Films les mieux notés' medias={topRatedMovies} openDetails={openDetails} />
            <MovieListItem isSerie title='Séries populaires' medias={popularSeries} openDetails={openDetails} />
            <MovieListItem isSerie title="Séries les mieux notées" medias={topRatedSeries} openDetails={openDetails} />
            <MovieListItem isSerie title="Séries à l'antenne" medias={seriesOnTheAir} openDetails={openDetails} />
          </ScrollView>
          <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
        </> :
        <ActivityIndicator color='#FA4B7C' size='large' style={{marginVertical: '50%'}} />
        }
    </ImageBackground>
  </ScrollView>
  );
}
