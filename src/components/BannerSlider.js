import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const images = [
  { id: '1', url: 'https://drive.google.com/uc?export=download&id=1XVGcv7XdvrajKXJ1uaUu3tJWfn_jc0jp' },
  { id: '2', url: 'https://drive.google.com/uc?export=download&id=1yODuJ6iRGk95xn1NxlXBVL7VyCyNc0s0' },
  { id: '3', url: 'https://drive.google.com/uc?export=view&id=1UeJ5lEA7KDkzatuGHnuHd46yXs_FEuem' },
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
    }, 3000); 

    return () => clearInterval(timer); 
  }, []);

  useEffect(() => {
    
    flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true });
  }, [currentIndex]);

  return (
    <FlatList
      ref={flatListRef}
      data={images}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.shadowContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.url }} style={styles.image} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    width: screenWidth - 30, 
    height: 150,
    marginHorizontal: 15, 
    marginTop: 15,
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5, 
    },
    shadowOpacity: 0.4, 
    shadowRadius: 10, 
    elevation: 4, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 5,
  },
  imageContainer: {
    width: '100%', 
    height: '100%',
    borderRadius: 10, 
    overflow: 'hidden',
  },
  image: {
    width: '100%', 
    height: '100%',
  },
});

export default BannerSlider;
