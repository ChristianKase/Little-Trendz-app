import { StyleSheet, TextInput, View, Text } from 'react-native';
import { colors } from '../globals/colors';

const InputForm = ({ label, value, onChangeText, isSecure, error }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        placeholder={label} 
        placeholderTextColor="lightgray"
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={isSecure}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '90%',
    padding: 12,
    fontFamily: 'Josefin',
    fontSize: 14,
    color:"white",
    borderRadius: 8,
    marginHorizontal: '5%',
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  error: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'Josefin',
    fontStyle: 'italic',
    marginLeft: 20,
  },
});
