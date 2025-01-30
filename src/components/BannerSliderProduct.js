import React from 'react';
import { FlatList, Image, View, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BannerSliderProduct = ({ images }) => {
 

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.url }} 
            style={styles.image} 
            resizeMode="contain" 
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: screenWidth - 30, 
    height: 250, 
    marginHorizontal: 15, 
    backgroundColor: '#E9E6E1', 
    borderRadius: 10, 
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
  },
  image: {
    height: '100%', 
    aspectRatio: 1, 
  },
});

export default BannerSliderProduct;
