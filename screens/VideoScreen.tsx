import React,{useState, useRef, useEffect, useCallback} from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';

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
        <View>

            <YoutubePlayer
                height={250}
                play={playing}
                videoId={item.key}
                onChangeState={onStateChange}
            />
        </View>))
        return trailers
  }
  
  return ( <>
        { currentVid ?
         displayTrailers(currentVideo.results)
         : <ActivityIndicator/>}
        </>
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
