import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import CardProductHome from "./CardProductHome"; 
import CardProduct from "./CardProduct"; 
import { colors } from "../globals/colors";

const TabBarHome = () => {
  const [selectedTab, setSelectedTab] = useState("Todo");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const categoryMap = {
    "Todo": "todo2",
    "Popular": "popular2",
    "Niños": "niños2",
    "Niñas": "niñas2",
  };

  
  const filterProducts = (category, productsData = allProducts) => {
    if (category === "Todo") {
      setFilteredData(productsData);
    } else {
      const internalCategory = categoryMap[category];
      const filtered = productsData.filter((item) => item.category2 === internalCategory);
      setFilteredData(filtered);
    }
  };

  
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch("https://ecommerceapp-23-default-rtdb.firebaseio.com/products.json"); 
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("La respuesta no es un JSON válido");
      }

      const data = await response.json();
      setAllProducts(data);
      filterProducts(selectedTab, data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setIsError(true);
      setError(err.message || "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    fetchProducts();
  }, []);

  
  useEffect(() => {
    filterProducts(selectedTab);
  }, [selectedTab, allProducts]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar productos:</Text>
        <Text>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    
      <View style={styles.tabBar}>
        {["Todo", "Popular", "Niños", "Niñas"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.selectedTabButton,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
             <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.selectedTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <CardProduct product={item} />
          </View>
        )}
        numColumns={2} 
        columnWrapperStyle={styles.rowContainer} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 20 },
  tabBar: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5 },
  selectedTabButton: { backgroundColor: colors.accent },
  tabText: { color: "#000", fontWeight: "500" },
  selectedTabText: { color: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontWeight: "bold", marginBottom: 10 },
  retryButton: { padding: 10, backgroundColor: "#000", borderRadius: 5 },
  retryText: { color: "#fff" },
  cardContainer: {
    flex: 1, 
    margin: 10, 
  },
  rowContainer: {
    justifyContent: "space-between", 
  },

});

export default TabBarHome;
