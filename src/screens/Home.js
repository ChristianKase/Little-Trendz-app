import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Categories from '../components/Categories';
import BannerSlider from '../components/BannerSlider';
import TabBarHome from '../components/TabBarHome';
import { colors } from '../globals/colors';
import { FontAwesome5 } from '@expo/vector-icons'; 

const Home = () => {
  const sections = [
    { id: 'banner', component: <BannerSlider /> },
    {
      id: 'whiteBox',
      component: (
        <View style={styles.whiteBox}>
          <FontAwesome5 name="truck" size={20} color={colors.primary} />
          <View style={styles.textContainer}>
            <Text style={styles.whiteBoxTextHighlight}>Envío gratis</Text>
            <Text style={styles.whiteBoxText}> por ser tu primera compra</Text>
          </View>
        </View>
      ),
    },
    { id: 'categories', component: <Categories /> },
    { id: 'tabBar', component: <TabBarHome /> },
  ];

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <View style={styles.section}>{item.component}</View>}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
    backgroundColor: colors.lightGray,
  },
  section: {
    marginBottom: 15,
  },
  whiteBox: {
    backgroundColor: 'white',
    padding: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, 
  },
  whiteBoxTextHighlight: {
    fontSize: 14,
    color: colors.primary, 
    fontWeight: 'bold',
  },
  whiteBoxText: {
    fontSize: 14,
    color: 'gray', 
    fontWeight: 'normal',
  },
});
