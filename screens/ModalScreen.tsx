import React,{useEffect,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import { useMovies } from '../contexts/MoviesContext';
import { ActivityIndicator, Card, Paragraph, IconButton } from 'react-native-paper';
import { POSTER_PATH } from '../utils/utils';
import dateFormat from 'dateformat'
export default function ModalScreen({route}:{route:any}) {
  const apiMovieCtx = useMovies()
  const [movie, setMovie] = useState<any>()
  const [loading, setLoading] = useState(false)
  const {id, isSerie} = route.params

  useEffect(() => {
    setLoading(true)
    if(!movie || movie.id !== apiMovieCtx.currentMovie.id){
      !isSerie ? apiMovieCtx.getMovieByID(id) : apiMovieCtx.getSerieByID(id)
      setMovie(apiMovieCtx.currentMovie)
    }
    setLoading(false)
  },[apiMovieCtx.currentMovie])


  {if(loading) return <ActivityIndicator animating size='large'/>}
  return (
    <View style={styles.container}>
      {!movie || loading ? <ActivityIndicator animating size='large'/> :
      <>
        <Card>
          <Card.Cover resizeMode='cover' style={{height: 400}} source={{uri:`${POSTER_PATH}${movie.backdrop_path}`}}/>
          <Card.Content style={{backgroundColor:'#cccfc8'}}>
            <Card.Title
              title={movie.title ? movie.title : movie.name}
              subtitle={movie.release_date ? dateFormat(movie.release_date, "dS mmmm, yyyy")  : dateFormat(movie.first_air_date, "dS mmmm, yyyy") }
              titleStyle={{textAlign:'center'}}
              titleNumberOfLines={2}
              subtitleStyle={{alignSelf:'center', color:'#FA4B7C'}}
              right={() => <IconButton 
                color='#FF0000' 
                size={30} 
                style={{position: 'absolute', right: -5}} 
                icon='youtube' 
                onPress={()=> console.log('youtube')}
              />}
            />
            <View style={styles.genresContainer}>
                {movie.genres.map((genre:any) => {
                  return (
                    <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                  )
                })}
                </View>
            <ScrollView>
              <Paragraph>{movie.overview}</Paragraph>
            </ScrollView>
          </Card.Content>
        </Card>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8c9cf'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 5
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  genresContainer:{
    flexDirection:"row",
    alignSelf: 'center',
    marginTop:20,
    marginBottom:20
  },
  genre: {
    marginRight:10,
    fontWeight:'bold'
  },
});
