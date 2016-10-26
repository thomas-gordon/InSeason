'use strict';

import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, StatusBar} from 'react-native';
//mport Markdown from 'react-native-simple-markdown';
import Welcome from './Welcome';

const viewStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        paddingLeft:40,
        paddingRight:40,
        fontSize:20,
    },
    button: {
        backgroundColor: "#009DDD",
        padding: 10,
        margin: 10,
    },
    buttonText: {
        color: "#fff"
    }
});

class Search extends Component {

    _handleChangePage = () => {
        //this.props.toggleNavBar();
        this.props.navigator.push({
            title: "Welcome Page",
            component: Welcome,
            passProps: {
                toggleNavBar: this.props.toggleNavBar,
            }
        });
    }

    render() {
        return (
            <View>
            <StatusBar
              backgroundColor="blue"
              barStyle="light-content"
            />
            <Text>Search</Text>
            <TouchableWithoutFeedback onPress={this._handleChangePage}>
            <View style={viewStyles.button}>
            <Text style={viewStyles.buttonText}>Go to Welcome</Text>
            </View>
            </TouchableWithoutFeedback>
            </View>
        );
    }
}

module.exports = Search;
