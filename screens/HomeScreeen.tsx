import React,{useState} from 'react'
import { ScrollView, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import Carousel from '../containers/Carousel';
import { RootTabScreenProps } from '../types';
import  {useMovies}  from '../contexts/MoviesContext';
import { TextInput, ActivityIndicator, Card } from 'react-native-paper';

export default function HomeScreeen({ navigation }: RootTabScreenProps<'Home'>) {
  const apiMovieCtx = useMovies()
  const [text, setText] = useState<any>()
  const URL_POSTER = 'https://image.tmdb.org/t/p/w500'
  
  return (
    <>
      <View>
        <Text style={{fontSize: 40, alignSelf:'center', fontWeight:'bold'}}>Tease me i'm famous</Text>
        <TextInput
          label='Rechercher'
          value={text}
          onChangeText={text => setText(text)}
          placeholder='votre description'
          style={{marginHorizontal: 20, marginVertical: 20}}
          multiline
          numberOfLines={5}
          autoComplete
          activeUnderlineColor='#FA4B7C'
          right={<TextInput.Icon name='magnify' onPress={()=> {}}/>}
        />
        </View>
        <ScrollView scrollEnabled >
        { 
          apiMovieCtx.topRatedMovies.length > 0 ?
          <View style={{height: 350}}>
            <Text style={{marginLeft: 5,fontSize: 22, fontWeight: 'bold'}}>Films les mieux notés</Text>
            <Carousel
            items={apiMovieCtx.topRatedMovies}
            render={ ({item}:{item:any}) => (
              <Card style={{marginTop: 50}}>
                  <Image resizeMode='contain' style={{width: 170, height: 255}} source={{uri:`${URL_POSTER}${item.poster_path}`}}/>
              </Card>
            )
            }
          />
          </View>
          : <ActivityIndicator size={'large'} animating={true} color={'red'}/>
        }
        { 
          apiMovieCtx.popularMovies.length > 0 ?
          <View style={{height: 350}}>
            <Text style={{marginLeft: 5,fontSize: 22, fontWeight: 'bold'}}>Films populaires</Text>
            <Carousel
            items={apiMovieCtx.popularMovies}
            render={ ({item}:{item:any}) => (
              <Card style={{marginTop: 50}}>
                  <Image resizeMode='contain' style={{width: 170, height: 255}} source={{uri:`${URL_POSTER}${item.poster_path}`}}/>
              </Card>
            )
            }
          />
          </View>
          : <ActivityIndicator size={'large'} animating={true} color={'red'}/>
        }
        { 
          apiMovieCtx.popularSeries.length > 0 ?
          <View style={{height: 350}}>
            <Text style={{marginLeft: 5,fontSize: 22, fontWeight: 'bold'}}>Séries populaires</Text>
            <Carousel
            items={apiMovieCtx.popularSeries}
            render={ ({item}:{item:any}) => (
              <Card style={{marginTop: 50}}>
                  <Image resizeMode='contain' style={{width: 170, height: 255}} source={{uri:`${URL_POSTER}${item.poster_path}`}}/>
              </Card>
            )
            }
          />
          </View>
          : <ActivityIndicator size={'large'} animating={true} color={'red'}/>
        }
     
    </ScrollView>
  </>
  );
}
