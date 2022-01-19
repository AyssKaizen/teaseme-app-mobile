import React, { useEffect, useState } from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { Card } from 'react-native-paper'
import { View, Text } from '../components/Themed'
import { useMovies } from '../contexts/MoviesContext'
import { POSTER_PATH } from '../utils/utils'

const SearchResultScreen = ({route,navigation}:{route:any, navigation: any}) => {
    const {searchText} = route.params
    const apiMovieCtx = useMovies()
    const {getMediasBySearchText} = apiMovieCtx
    const [medias, setMedias] = useState<Array<any>>([])

    useEffect(() => {
        getMediasBySearchText(searchText).then((res) => {
            setMedias(res)
        })
    },[])

    const openDetails = (id: string, typeOfMedia: string) => {
        navigation.goBack()
        typeOfMedia === 'movie' 
        ? navigation.navigate('Details', {id: id})
        : navigation.navigate('Details', {id: id, isSerie: true})
        
    }

    

    const loopCompo = (medias: any) => {
        const searchResult = medias
            .filter((media:any)=> ( media.media_type != 'person'))
            .map( (media:any) => (
                <View key={media.id} style={{margin: 4, width: 130}}>
                    <Text style={{fontWeight: 'bold', textAlign:'center'}}>{media.media_type === 'movie' ? media.title : media.name }</Text>
                    <Card elevation={5} style={{height: 195}} onPress={() => openDetails(media.id, media.media_type)} >
                        <Card.Cover style={{width: '100%', height: '100%'}} resizeMode='contain'  source={{uri:`${POSTER_PATH}${media.poster_path}`}}/>
                    </Card>
                </View>
            ))
        return searchResult
    }
    
   return (
       <>
        { medias.length > 0 ? 
            <ScrollView>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around', flexWrap: 'wrap', flexBasis:2}}>
                    {loopCompo(medias)}
                </View>
            </ScrollView>
        :   <ActivityIndicator/>}
       </>
   )
    
}
export default SearchResultScreen