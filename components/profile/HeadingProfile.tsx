import { ImageSourcePropType, StyleSheet } from 'react-native'
import { Text, View } from '../Themed'
import { Image } from 'react-native'


const HeadingProfile = () => {
    const img : ImageSourcePropType = require('../../assets/images/nell.png')
    return (
        <>
            <View style={styles.topPart}>
                <Image resizeMode='cover' source={img} style={styles.avatar}/>
            </View>
            <Text style={styles.title}>Nell Sama</Text>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 80
      },
      avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        position: 'relative',
        bottom: -70
      },
      topPart: {
        backgroundColor: '#062B16', 
        height: 170, 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center'
      }
})

export default HeadingProfile