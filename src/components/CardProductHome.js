import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../globals/colors";

const CardProductHome = ({ category, title, stock, price, thumbnail, onPress }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
                styles.cardContainer,
                isPressed && styles.pressedCard, 
            ]}
        >
            
            <View style={styles.imageContainer}>
                <MaterialIcons name="favorite-border" size={20} color="white" style={styles.favoriteIcon} />
                <Image
                    source={{ uri: thumbnail }}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                        resizeMode: "contain",
                    }}
                />
            </View>

            
            <View style={styles.textContainer}>
                <Text style={styles.label}>{category}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>stock: {stock}</Text>
                <Text style={styles.price}>Precio: {price}</Text>
            </View>

           
            <MaterialIcons name="arrow-forward" size={24} color="black" style={styles.optionsIcon} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        width: "100%",
        height: 120,
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        overflow: "hidden", 
    },
    pressedCard: {
        opacity: 0.7, 
        transform: [{ scale: 0.98 }], 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6, 
    },
    imageContainer: {
        width: 120,
        height: "100%",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: colors.lightGray,
    },
    favoriteIcon: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginLeft: 10,
    },
    label: {
        fontSize: 12,
        color: "gray",
        fontWeight: "bold",
        marginBottom: 5,
        backgroundColor: colors.lightGray,
        width:70,
        padding: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginBottom: 3,
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
    },
    optionsIcon: {
        marginHorizontal: 10,
    },
});

export default CardProductHome;
