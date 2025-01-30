import React, { useEffect } from 'react';
import { Text, StyleSheet, Pressable, View, Image, FlatList } from 'react-native';
import { colors } from '../globals/colors'; 
import TextPrimary from '../components/TextPrimary'; 
import { useNavigation } from '@react-navigation/native';
import categories from '../data/categories.json';

const CardItemCategory = ({ category, icon }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('ProductsByCategory', { category })}
      style={styles.container}
    >
      <View style={styles.circle}>
        <Image source={{ uri: icon }} style={styles.icon} />
      </View>
      <Text style={styles.text}>{category}</Text>
    </Pressable>
  );
};

export default CardItemCategory;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: 'white', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.00,
    
    elevation: 2,
  
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  
  },
  text: {
    fontSize: 10,
    color: colors.lightgray, 
    textAlign: 'center',
  },
});
