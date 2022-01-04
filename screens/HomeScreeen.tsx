
import { ScrollView, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import Carousel from '../containers/Carousel';
import { RootTabScreenProps } from '../types';
import  {useMovies}  from '../contexts/MoviesContext';

export default function HomeScreeen({ navigation }: RootTabScreenProps<'Home'>) {
  const movies:any= useMovies()
  console.log(movies.movies);
  const URL_POSTER = 'https://image.tmdb.org/t/p/w300'
  
  //console.log(JSON.stringify( movies.movie));
  
  
  
  return (
    <ScrollView contentContainerStyle={{ height: '100%'}}>
        <Text style={{fontSize: 30, alignSelf:'center'}}>Popular movie</Text>
        <Carousel
          items={movies.movies}
          render={ ({item}:{item:any}) => (
            <>
                <Text style={{textAlign: 'center', color: 'black'}}>{item.release_date}</Text>
                <Image resizeMode='contain' style={{width: 300, height: 250}} source={{uri:`${URL_POSTER}${item.poster_path}`}}/>
                <Text style={{textAlign: 'center', color: 'black'}}>{item.title}</Text>
            </>
          )
          }
        />
    </ScrollView>

  );
}
