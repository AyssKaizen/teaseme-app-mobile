import React,{useEffect,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { ScrollView } from 'react-native';
import { useMovies } from '../contexts/MoviesContext';
import { ActivityIndicator, Card, Paragraph, Avatar, IconButton } from 'react-native-paper';
import { POSTER_PATH } from '../utils/utils';

export default function ModalScreen({route}:{route:any}) {
  const apiMovieCtx = useMovies()
  const [movie, setMovie] = useState<any>()
  const [loading, setLoading] = useState(false)
  const {id, isSerie} = route.params

  useEffect(() => {
    if(!movie || movie.id !== apiMovieCtx.currentMovie.id){
      setLoading(true)
      !isSerie ? apiMovieCtx.getMovieByID(id) : apiMovieCtx.getSerieByID(id)
      setMovie(apiMovieCtx.currentMovie)
      setLoading(false)
    }
  },[apiMovieCtx.currentMovie])



  return (
    <View style={styles.container}>
      {!movie || loading ? <ActivityIndicator animating size='large'/> :
      <>
        <Card>
          <Card.Cover resizeMode='cover' style={{height: 500}} source={{uri:`${POSTER_PATH}${movie.poster_path}`}}/>
          <Card.Content>
            <Card.Title
              title={movie.title ? movie.title : movie.name}
              subtitle={movie.release_date ? movie.release_date : movie.first_air_date}
              titleStyle={{textAlign:'center'}}
              titleNumberOfLines={2}
              subtitleStyle={{justifyContent:'flex-end'}}
              right={() => <IconButton 
                color='#FF0000' 
                size={30} 
                style={{position: 'absolute', right: -5}} 
                icon='youtube' 
                onPress={()=> console.log('youtube')}
              />}
            />
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
});
