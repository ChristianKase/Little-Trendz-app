import { Pressable, StyleSheet, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { colors } from '../globals/colors';
import { useDeleteCartProductMutation } from '../services/cart';
import { useSelector } from 'react-redux';

const CardCartProduct = ({product}) => {
    const {title, description, price,quantity} = product
    const localId = useSelector(state => state.user.localId)
    const [triggerDeleteItemCart] = useDeleteCartProductMutation()

    const deleteCartProduct = () => {
        triggerDeleteItemCart({localId,productId:product.id})
    }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.containerText}>
            <Text style={styles.text}>Precio: $ {price}</Text>
            <Text style={styles.text}>Cantidad: {quantity}</Text>
        </View>
      </View>
      <Pressable onPress={deleteCartProduct}>
        <Entypo name="trash" size={28} color={colors.lightGray} />
      </Pressable>
      
    </View>
  )
}

export default CardCartProduct

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        margin:10,
        borderRadius:5,
        padding:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        overflow: "hidden", 
        },

    content:{
        width:"80%",
        gap:10
    },

    containerText:{
        flexDirection:"row",
        gap:20
    },

    title:{
        fontSize:18,
        color: colors.lightGray,
        fontWeight:"bold",
    },

    description:{
        color:colors.lightGray,
        width:"70%"
    },

    text:{
        color:colors.lightGray,
        fontSize:16,
        fontWeight:"bold"
    }
    
})