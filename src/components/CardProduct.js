import { ImageBackground, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'; 
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../globals/colors';

const CardProduct = ({ product }) => {
  const { title, price, stock, thumbnail } = product;
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);  

  const cardWidth = (width * 0.45) - 10; 
  const cardHeight = 200; 

  const handlePressHeart = () => {
    setIsFavorite(prevState => !prevState);  
  };

  return (
    <Pressable
      style={[styles.container, { width: cardWidth, height: cardHeight }]} 
      onPress={() => navigation.navigate("ProductDetail", { product })}
    >
     
      <ImageBackground
        style={[styles.imageBackground]} 
        source={{ uri: thumbnail }}   
        resizeMode="cover"            
        imageStyle={{ borderRadius: 8 }} 
      >
     
        <Pressable style={styles.button} onPress={handlePressHeart}>
          <FontAwesome name="heart" size={14} color={isFavorite ? "red" : "white"} />
        </Pressable>

        
        <View style={[styles.textContainer]}>
          <View style={styles.leftTextContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.infoText}>Stock: {stock}</Text>
          </View>
          <View style={styles.rightTextContainer}>
            <Text style={styles.priceText}>${price}</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    margin: 5, 
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%', 
    height: '100%', 
    justifyContent: 'flex-end', 
    overflow: 'hidden',
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderRadius: 20,
    padding: 8,  
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end', 
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    padding: 10,  
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8, 
  },
  leftTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightTextContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    color: 'white', 
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
    textAlign: 'left',
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'left',
  },
  priceText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
