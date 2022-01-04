import React from 'react';
import {Animated, View} from 'react-native';


const Indicator = 
    (
        {scrollX, itemWidth, num, lastDot}:
        {scrollX: Animated.Value,itemWidth: number,num: number, lastDot?: boolean}
    ) => {

  return (
    <View style={{paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'}}>
      {[...Array(num)].map((_, i) => {
        const inputRange = [
          (i - 1) * itemWidth,
          i * itemWidth,
          (i + 1) * itemWidth,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [1, 1.5, 1],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1.0, 0.5],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={{...styles.dot(i,num,lastDot), opacity, transform: [{scale}]}}
          />
        );
      })}
    </View>
  );
};

const styles = {
  dot: (i:number,num:number,lastDot?:boolean) => ({
    width: i+1 === num && lastDot  ? 10 : 4,
    height:i+1 === num && lastDot ? 10 : 4,
    borderRadius: i+1 === num && lastDot ? 25 : 2,
    backgroundColor: i+1 === num && lastDot ? 'red' : 'blue',
    margin: 8,
  }),
};

export default Indicator;
