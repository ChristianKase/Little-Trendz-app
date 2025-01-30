import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useGetUserQuery } from '../services/user';
import CardProductHome from '../components/CardProductHome';

const MyProfile = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  const email = useSelector((state) => state.user.email);
  const localId = useSelector((state) => state.user.localId);

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useGetUserQuery({ localId });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://ecommerceapp-23-default-rtdb.firebaseio.com/products.json'
        );
        const data = await response.json();

        const filteredProducts = Object.values(data).filter(
          (product) => product.category2 === 'popular2'
        );

        setProducts(filteredProducts);
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  if (isLoadingUser || isLoadingProducts) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (isErrorUser || error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error || 'Hubo un error al cargar los datos del usuario.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageBackground}>
        <Image
          source={require('../../assets/Fondo-myprofile3.jpg')}
          style={styles.backgroundImage}
        />
      </View>

      <View style={styles.circleContainer}>
        <Image
          source={
            user?.image
              ? { uri: user.image }
              : require('../../assets/profile_default.png')
          }
          resizeMode="cover"
          style={styles.image}
        />
      </View>

      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>{email || 'Correo no disponible'}</Text>
      </View>

      <View style={styles.addressContainer}>
        <Icon name="location-outline" size={20} color="#000" style={styles.locationIcon} />
        <Text style={styles.addressText}>{String(user?.address || 'Dirección no disponible')}</Text>
      </View>

      <View style={styles.buttonRow}>
        <SubmitButton
          title="Imagen de perfil"
          onPress={() => navigation.navigate('ImageSelector')}
        />
        <SubmitButton
          title="Localización"
          onPress={() => navigation.navigate('LocationSelector')}
        />
      </View>

      <Text style={styles.title}>Popular</Text>

      {products.map((product, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardContainer}
          onPress={() => handleProductPress(product)}
        >
          <CardProductHome
            category={product.category}
            title={product.title}
            stock={product.stock}
            price={product.price}
            thumbnail={product.thumbnail}
            onPress={() => handleProductPress(product)}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "white",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    resizeMode: 'cover',
  },
  circleContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: 'white',
    marginTop: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emailContainer: {
    marginTop: 4,
  },
  emailText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    marginHorizontal: 5, 
  },
  addressText: {
    fontSize: 16,
    color: '#555',
  },
  locationIcon: {
    marginRight: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10, 
  },
  title: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start', 
  },
  cardContainer: {
    marginTop: 10,
    width: '100%',
  },
});

export default MyProfile;
