import React,{useState, useEffect, useCallback} from 'react';
import { View, StyleSheet, Alert, ActivityIndicator,ScrollView } from 'react-native';
import { Text } from '../components/Themed';
import YoutubePlayer from "react-native-youtube-iframe";
import { useMovies } from '../contexts/MoviesContext';

export default function VideoScreen({route}:{route:any}) {
  const apiMovieCtx = useMovies()
  const [playing, setPlaying] = useState(false);
  const {getMovieVideoByID, currentVideo} = apiMovieCtx
  const [currentVid, setCurrentVid] = useState<any>()
  const {id} = route.params

  useEffect(() => {
    if(!currentVid || id != currentVid.id){
        getMovieVideoByID(id)
        setCurrentVid(currentVideo)
    }
  },[currentVideo])

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const displayTrailers = (trailerArray: Array<any>) => {
    const trailers:any = trailerArray.map((item)=> (
        <View style={{display: 'flex', justifyContent:'center', alignItems:'center', marginTop: 15}} key={item.id}>
            <Text style={{fontSize: 17, fontWeight:'600', textAlign:'center', marginBottom: 10, marginHorizontal: 30}}>{item.name}</Text>
            <YoutubePlayer
                height={220}
                width={350}
                play={playing}
                videoId={item.key}
                onChangeState={onStateChange}
            />
        </View>))
        return trailers
  }
  
  return ( 
        <ScrollView>
            { 
                currentVid 
                ? displayTrailers(currentVid.results)
                : <ActivityIndicator/>
            }
            {
                currentVid?.results <=  0 && <Text style={{fontWeight: 'bold', fontSize: 30, alignSelf:'center', textAlign:'center', marginVertical: '50%'}}>😞Aucune Bande annonces pour ce média😞</Text>
            }
        </ScrollView>
        )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
