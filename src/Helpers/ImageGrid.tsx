import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  ImageSourcePropType,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useTheme} from '../context/ThemeProvider';
import CustomText from './CustomText';

type CarouselItem = {
  image: ImageSourcePropType | undefined;
};
type ImageGridProps = {
  images: CarouselItem[];
};

export const SLIDER_WIDTH = Dimensions.get('window').width + 100;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const ImageGrid = ({images}: ImageGridProps) => {
  const {theme} = useTheme();
  const [activeImage, setActiveImage] = useState<number>(0);
  const ref = useRef<any>(null);
  const renderItem = ({item, index}: {item: CarouselItem; index: number}) => {
    return (
      <View style={styles.renderItemView}>
        <Image source={item.image} style={styles.image} key={index} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Carousel
          ref={ref}
          layout="tinder"
          data={images}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          useScrollView={true}
          inactiveSlideShift={0}
          onSnapToItem={index => setActiveImage(index)}
        />
      </View>
      <TouchableHighlight
        style={[
          styles.imageIndexBtn,
          {backgroundColor: theme.transparentBlack},
        ]}>
        <CustomText style={styles.imageIndexTxt}>
          {activeImage + 1} / {images.length}
        </CustomText>
      </TouchableHighlight>

      <View style={styles.paginationView}>
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeImage}
          containerStyle={styles.paginationContainer}
          dotStyle={{backgroundColor: theme.pPrimary}}
          inactiveDotStyle={styles.inactivePaginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
          carouselRef={ref as any}
        />
      </View>
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    marginBottom: -30,
  },
  wrapper: {
    height: 250,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderItemView: {
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inactivePaginationDot: {},
  paginationContainer: {},
  paginationView: {
    position: 'absolute',
    bottom: 20,
    right: -10,
  },
  imageIndexBtn: {
    width: 25,
    height: 20,
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIndexTxt: {
    fontSize: 8,
    color: '#fff',
  },
});
