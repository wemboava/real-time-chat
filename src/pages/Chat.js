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

StatusBar.setBarStyle('dark-content');

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13a3ab',
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
    backgroundColor: '#97e4e0',
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
  componentDidMount() {
    this.props.conversation.subscribeToMore({
      document: gql`
        subscription onMessageAdded($author: String!) {
          Message(filter: {
            mutation_in: [CREATED]
            node: {
              from_not: $author
            }
          }) {
            node {
              id
              from
              message
            }
          }
        }
      `,
      variables: {
        author,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData['Message']) return prev;

        const newItem = subscriptionData['Message'].node;

        return { ...prev, allMessages: [ ...prev.allMessages, newItem ] };
      }
    });
  }

  componentDidUpdate(prevProps) {
    setTimeout(() => {
      this._scrollView.scrollToEnd({ animated: false });
    }, 0);
  }

  handleAddMessage = (proxy, { data: { createMessage } }) => {
    const data = proxy.readQuery({
      query: ConversationQuery,
    });

    data.allMessages.push(createMessage);

    proxy.writeQuery({
      query: ConversationQuery,
      data
    });

    this._scrollView.scrollToEnd({ animated: false });
  };

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
      >
        <ScrollView
          contentContainerStyle={styles.conversation}
          keyboardDismissMode={Platform.OS === 'android' ? 'none' : 'interactive'}
          keyboardShouldPersistTaps="never"
          ref={scrollView => this._scrollView = scrollView}
        >
          {
            this.props.conversation.loading
              ? <ActivityIndicator style={styles.loading} color="#FFF" />
              : this.renderChat()
          }
        </ScrollView>
        <Input author={author} onAddMessage={this.handleAddMessage} />
      </KeyboardAvoidingView>
    );
  }
}

export default graphql(ConversationQuery, {
  name: 'conversation',
})(Chat);
