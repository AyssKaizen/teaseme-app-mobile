import React from 'react'
import { Card } from 'react-native-paper'
import { Image, View } from 'react-native'
import { Text } from '../Themed'
import Carousel from '../../containers/Carousel'
import StarRating from 'react-native-star-rating'
import { POSTER_PATH as URL_POSTER } from '../../utils/utils'



const MovieListItem = ({medias,openModal, title, isSerie}:{medias: any,title: string, openModal:(id:string, isSerie: boolean) => void, isSerie: boolean}) => {
    return (
        <View style={{height: 340}}>
            <Text style={{marginLeft: 5,fontSize: 22, fontWeight: 'bold'}}>{title}</Text>
            <Carousel
            items={medias}
            render={ ({item}:{item:any}) => (
              <Card elevation={5} onPress={() => openModal(item.id, isSerie)} style={{marginTop: 50}}>
                  <Image resizeMode='cover' style={{width: 170, height: 255}} source={{uri:`${URL_POSTER}${item.poster_path}`}}/>
                  <View style={{alignSelf:'center', flexDirection: 'row'}}>
                    <Text style={{paddingTop: 2, paddingRight: 5, fontSize: 18, fontWeight:'bold'}}>Note:</Text>
                    <StarRating 
                      disabled={true}
                      maxStars={5}
                      starSize={20}
                      rating={item.vote_average /2}
                      fullStarColor={"#D4AF37"}
                      starStyle={{paddingTop: 3}}
                    />
                  </View>
              </Card>
            )
            }
          />
          </View>
    )
}
export default MovieListItem