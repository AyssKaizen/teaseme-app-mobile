import React from 'react'
import { View, Text } from '../components/Themed'

const SearchResultScreen = ({route}:{route:any}) => {
    const {searchText} = route.params
    
   return (
       <View>
           <Text>{searchText}</Text>
       </View>
   )
    
}
export default SearchResultScreen