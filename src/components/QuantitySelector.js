import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../globals/colors'; 

const QuantitySelector = ({ onChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleDecrease}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable style={styles.button} onPress={handleIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

export default QuantitySelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    justifyContent: 'center',
    
  },
  button: {
  
    padding: 0,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width:40,
    height:40,
    borderWidth: 1, 
    borderColor: colors.darkGray, 
    
  },

  buttonText: {
    color: colors.darkGray,
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
});
