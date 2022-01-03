import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { Drawer } from "react-native-paper"



const SpeedActions = ({style,title,icon,onPress}: {style?: StyleProp<TextStyle>,title: string,icon: string,onPress?: ()=> void}) => {
    return(
            <Drawer.Item
                style={style}
                icon={icon}
                label={title}
                onPress={onPress}
            />
    )
}

export default SpeedActions