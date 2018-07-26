import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class Input extends Component {
  render() {
    const styles = StyleSheet.create({
      inputContainer: {
        height: 42,
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: '#fafafa',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#CCC',
        flexDirection: 'row',
        alignItems: 'center',
      },
      input: {
        flex: 1,
        height: 30,
        paddingHorizontal: 10,
        paddingVertical: 0,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 12,
      },
      button: {
        marginLeft: 10,
        color: '#358CFF',
        fontWeight: 'bold',
      },
    });
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="rgba(0, 0, 0,)"
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.button}>
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Input;
