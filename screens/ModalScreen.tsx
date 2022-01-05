import React,{useEffect,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useMovies } from '../contexts/MoviesContext';
import { ActivityIndicator } from 'react-native-paper';

export default function ModalScreen({route}:{route:any}) {
  const apiMovieCtx = useMovies()
  const [movie, setMovie] = useState<any>()
  const {id} = route.params

  useEffect(() => {
    console.log(movie);
    if(!movie || movie.id != apiMovieCtx.currentMovie.id){
      apiMovieCtx.getMovieByID(id)
      setMovie(apiMovieCtx.currentMovie)
    }
  },[apiMovieCtx.currentMovie])



  return (
    <View style={styles.container}>
      {!movie ? <ActivityIndicator/> :
      <>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/ModalScreen.tsx" />

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
