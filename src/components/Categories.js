import { StyleSheet,FlatList,View,Text} from 'react-native'
import CardItemCategory from './CardItemCategory'
import { useGetCategoriesQuery} from '../services/shop';

const Categories = () => {

  const {data:categories,isError,error,isSuccess,isLoading} = useGetCategoriesQuery()

  if(isLoading) return <View><Text>Cargando</Text></View>
  if(isError) return <View><Text>{error.message}</Text></View>
  
  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id} 
      renderItem={({ item }) => (
        <CardItemCategory category={item.category} icon={item.icon} />
      )}
      horizontal={true}
      contentContainerStyle={styles.containerCard}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  containerCard: {
    paddingHorizontal: 20,
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
  },
});
