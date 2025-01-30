import React, { useState } from 'react';
import {  StyleSheet,  Text,  View,  ScrollView,  Pressable, Alert,} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Rating } from 'react-native-ratings';
import { colors } from '../globals/colors';
import BannerSliderProduct from '../components/BannerSliderProduct';
import HorizontalLine from '../components/HorizontalLine';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { usePostCartMutation, useGetProductCartQuery } from '../services/cart';
import Counter from '../components/Counter';

const ProductDetail = ({ route }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const { product } = route.params;
  const localId = useSelector((state) => state.user.localId);

  const [triggerAddProduct] = usePostCartMutation();
  const { data: productCart } = useGetProductCartQuery({
    localId,
    productId: product.id,
  });

  const increment = () => {
    const cartQuantity = productCart ? productCart.quantity : 0;
    if (quantity >= product.stock - cartQuantity) return;
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handleAddProduct = async () => {
    if (!selectedSize || !selectedColor) {
      Alert.alert(
        'Selección requerida',
        'Por favor, selecciona un tamaño y un color.'
      );
      return;
    }

    const cartQuantity = productCart ? productCart.quantity : 0;
    if (product.stock - cartQuantity === 0) {
      Alert.alert(
        'Sin stock',
        'No hay suficiente stock para agregar más productos.'
      );
      return;
    }

    const newQuantity = quantity + cartQuantity;
    const cartProduct = {
      ...product,
      quantity: newQuantity,
    };

    try {
      await triggerAddProduct({ localId, cartProduct });
      setQuantity(1);
      navigation.navigate('CartStack');
    } catch (error) {
      Alert.alert(
        'Error',
        'Hubo un problema al agregar el producto al carrito.'
      );
    }
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL',];
  const images = product.images.map((url, index) => ({
    id: String(index),
    url,
  }));

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.bannerContainer}>
        <BannerSliderProduct images={images} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{product.title}</Text>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={15}
          readonly
          startingValue={product.rating}
          style={styles.rating}
        />
      </View>

      <Text style={styles.description}>{product.description}</Text>
      <HorizontalLine />

      <Text style={styles.sectionTitle}>Selecciona tamaño:</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.sizeButtonSelected,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.sizeTextSelected,
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Selecciona color:</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={selectedColor}
          onValueChange={(itemValue) => setSelectedColor(itemValue)}
        >
          <Picker.Item label="Selecciona un color" value={null} />
          {product.colors.map((color) => (
            <Picker.Item key={color} label={color} value={color} />
          ))}
        </Picker>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.price}>${product.price}</Text>
        <Counter
          quantity={quantity}
          increment={increment}
          decrement={decrement}
        />
      </View>
      <Pressable style={styles.addToCartButton} onPress={handleAddProduct}>
        <Text style={styles.addToCartText}>Agregar al carrito</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  bannerContainer: {
    marginHorizontal: -16,
    marginBottom: 16,
    marginTop: -16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  rating: {
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    color: colors.darkGray,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  sizeButtonSelected: {
    backgroundColor: '#FDA191',
    borderColor: colors.accent,
  },
  sizeText: {
    fontSize: 14,
    color: colors.darkGray,
  },
  sizeTextSelected: {
    color: colors.lightGray,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 4,
    marginVertical: 4,
    paddingHorizontal: 8,
    
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  price: {
    fontSize: 40,
    fontWeight: 'bold',
    marginRight: 16,
    color: colors.darkGray,
  },
  addToCartButton: {
    backgroundColor: colors.accent || '#FFA500',
    
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  addToCartText: {
    fontSize: 16,
    color: colors.lightGray || '#FFF',
    textAlign: 'center',
  },
});
