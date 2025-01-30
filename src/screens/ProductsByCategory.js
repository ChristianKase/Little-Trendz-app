import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import Search from '../components/Search';
import CardProduct from '../components/CardProduct';
import { useGetProductsQuery } from '../services/shop';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductsByCategory = ({ route }) => {
  const { category } = route.params;
  const { data, isSuccess, isError, error, isLoading } = useGetProductsQuery(category);
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setProducts(Object.values(data));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      setProducts(Object.values(data).filter(product => product.title.includes(keyword)));
    }
  }, [keyword, isSuccess]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <View><Text>{error.message}</Text></View>;

  return (
    <View style={styles.container}>
      <Search onChangeKeyword={(t) => setKeyword(t)} />
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <CardProduct product={item} />
          </View>
        )}
        numColumns={2} 
      />
    </View>
  );
};

export default ProductsByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  productContainer: {
    flex: 1,
    margin: 5,
  },
});
