import React,{useState} from 'react'
import {View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard } from 'react-native';
import HeadingProfile from '../components/profile/HeadingProfile';
import { Divider, Drawer, TextInput,  } from 'react-native-paper';
import SpeedActions from '../components/profile/SpeedActions';
export default function ProfileScreen() {
  const [text, setText] = useState("")
  const [editable, setEditable] = useState(false)

  
  return (
  <KeyboardAvoidingView behavior='position'>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View >
          <HeadingProfile/>
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
              label='who i am'
              value={text}
              onChangeText={text => setText(text)}
              placeholder='votre description'
              style={{marginHorizontal: 20, marginVertical: 20}}
              multiline
              numberOfLines={5}
              autoComplete
              activeUnderlineColor='#FA4B7C'
              editable={editable}
              right={<TextInput.Icon name='pen' onPress={()=> {setEditable(!editable)}}/>}
            />
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
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
