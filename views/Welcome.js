'use strict';

import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import ConnectionInfoSubscription  from '../components/ConnectionInfoSubscription';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            automaticallyAdjustContentInsets: false,
            contentContainerStyle: styles.container
        }
    }
  render() {
    return (
      <ScrollView automaticallyAdjustContentInsets={this.state.automaticallyAdjustContentInsets} contentContainerStyle={this.state.contentContainerStyle}>
        <Text>Welcome to the homepage!</Text>
        <ConnectionInfoSubscription />
      </ScrollView>
    );
  }
}
module.exports = Welcome
