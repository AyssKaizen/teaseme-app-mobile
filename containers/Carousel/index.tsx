import React, {useRef} from 'react';
import {Animated, View, Dimensions, StyleSheet} from 'react-native';
import Crs from 'react-native-snap-carousel'
import Indicator from './Indicator';

// https://github.com/archriss/react-native-snap-carousel
// https://www.youtube.com/watch?v=YE7c6ch2msY

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WIDTH * 0.57);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH / 4) * 3.2);

const Carousel = (
    {items = [], render, onChange, onScroll, lastDot} :
    {lastDot?: boolean,items: any, render: any, onChange?:any, onScroll?: any}
  ) => 
{
    const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      {/*<Indicator scrollX={scrollX} itemWidth={ITEM_WIDTH} num={items.length} lastDot={lastDot} />*/}
      <Crs
        sliderWidth={WIDTH}
        autoplay
        autoplayDelay={4}
        itemWidth={ITEM_WIDTH}
        inactiveSlideOpacity={1.0}
        inactiveSlideScale={1.0}
        data={items}
        renderItem={props => <View style={styles.item}>{render(props)}</View>}
        onSnapToItem={index => onChange && onChange(index)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false, listener: onScroll}
        )}
        scrollEventThrottle={32}
        decelerationRate={0.9}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: -20,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Carousel;
