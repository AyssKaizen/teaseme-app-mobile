import React,{useState, useRef} from 'react'
import { StyleSheet } from 'react-native';
import HeadingProfile from '../components/profile/HeadingProfile';
import { View, ScrollView, Keyboard } from 'react-native';
import { Divider, Drawer, TextInput,  } from 'react-native-paper';
import SpeedActions from '../components/profile/SpeedActions';
export default function ProfileScreen() {
  const [text, setText] = useState("")
  const scrollRef = useRef(null)
  
  return (
  <View >
      <HeadingProfile/>
      <ScrollView ref={scrollRef}>
        <SpeedActions onPress={()=> console.log('Favoris clicked')} icon='star' title="Favoris" style={styles.fav}/>
        <SpeedActions onPress={()=> console.log('Chat clicked')} icon='forum' title="Chat" style={styles.chat} />
        <Divider style={{backgroundColor: '#FA4B7C', height: 0.5}}/>
        <Drawer.Item 
          style={{marginLeft: '10%'}}
          icon='home-variant-outline'
          label='Hueco mundo'
        />
        <Drawer.Item 
          style={{marginLeft: '10%'}}
          icon='at'
          label='nellsama@hueco.com'
        />
        <TextInput
          label='Description'
          value={text}
          onChangeText={text => setText(text)}
          placeholder='votre description'
          style={{marginHorizontal: 20, height: 120, marginVertical: 50}}
          multiline
          numberOfLines={4}
          autoComplete
          activeUnderlineColor='#FA4B7C'
          //onFocus={()=> console.log(scrollRef.current.scrollTo({y:}))}
        />


      </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      flexDirection: 'row'
    },
    fav:{
      position: 'relative', 
      right: '-9%',
      width: '35%',
      borderColor:'#FA4B7C',
      borderWidth: 1.5
    },
    chat:{
      position: 'relative', 
      width: '35%', 
      borderColor:'#FA4B7C',
      borderWidth: 1.3, 
      right: '-51%', 
      top: '-99%'
    }
});
