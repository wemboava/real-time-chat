import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
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
  loading: {
    marginTop: 20,
  }
});

const ConversationQuery = gql`
  query {
    allMessages(
      orderBy: createdAt_ASC
    ) {
      id
      from
      message
    }
  }
`;

const author = 'Willian';

class Chat extends Component {
  componentDidUpdate() {
    setTimeout(() => {
      this._scrollView.scrollToEnd({ animated: false })
    }, 0);
  }
  renderChat = () => (
    this.props.conversation.allMessages.map(item => (
      <View
        key={item.id}
        style={[
          styles.bubble,
          item.from === author
            ? styles['bubble-right']
            : styles['bubble-left'],
        ]}
      >
        <Text style={styles.author}>
          {item.from}
        </Text>
        <Text style={styles.message}>
          {item.message}
        </Text>
      </View>
    ))
  );

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        // keyboardShouldPerssistTabs="never"
      >
        <ScrollView
          ref={scrollView => this._scrollView = scrollView}
          contentContainerStyle={styles.conversation}
        >
          {
            this.props.conversation.loading
              ? <ActivityIndicator style={styles.loading} color="#FFF" />
              : this.renderChat()
          }
        </ScrollView>
        <Input />
      </KeyboardAvoidingView>
    );
  }
}

export default graphql(ConversationQuery, {
  name: 'conversation',
})(Chat);
