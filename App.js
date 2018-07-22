import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import './config/ReactotronConfig';

console.tron.log('Oi');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export const App = () => (
  <View style={styles.container}>
    <Text>
      teste
    </Text>
  </View>
);
