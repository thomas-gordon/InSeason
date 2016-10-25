'use strict';

import React, { Component } from 'react';
import { Text, View, AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';
import Welcome from '../views/Welcome';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class InSeasonApp extends Component {
  render() {
    return (
        <NavigatorIOS
           initialRoute={{
             component: Welcome,
             title: 'In Season',
           }}
           style={{flex: 1}}
         />
    );
  }
}
module.exports = InSeasonApp
