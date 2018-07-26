import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';

import Input from '../components/input';

StatusBar.setBarStyle('light-content');

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C4241',
    ...Platform.select({
      ios: { paddingTop: 20 },
    }),
  },
  conversation: {
    padding: 10,
  },
  bubble: {
    padding: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    marginTop: 10,
    maxWidth: width - 60,
  },
  'bubble-right': {
    alignSelf: 'flex-end',
    backgroundColor: '#D1EDC1',
  },
  'bubble-left': {
    alignSelf: 'flex-start',
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#333',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});

const Chat = () => (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    // keyboardShouldPerssistTabs="never"
  >
    <ScrollView contentContainerStyle={styles.conversation}>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>
          Amor
        </Text>
        <Text style={styles.message}>
          Oi mozi
        </Text>
      </View>
      <View style={[styles.bubble, styles['bubble-right']]}>
        <Text style={styles.author}>
          Willian
        </Text>
        <Text style={styles.message}>
          Oi amor
        </Text>
      </View>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>
          Amor
        </Text>
        <Text style={styles.message}>
          Tudo bem?
        </Text>
      </View>
    </ScrollView>

    <Input />
  </KeyboardAvoidingView>
);

export default Chat;
