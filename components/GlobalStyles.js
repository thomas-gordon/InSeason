'use strict'

import React, { Component } from 'react';
import { Text, StatusBar, View, AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';

const GlobalStyles = StyleSheet.create({
    appWrapper: {
        flex:1,
        flexDirection: 'column',
        paddingTop:68
    },
    webviewWrapper: {
        flex:1,
        flexDirection: 'column',
    },
    centerView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:-68,
        padding:20
    },
    container: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    nav: {
        flex: 1,
        marginTop:-70
    },
    navWrap: {
        flex: 1,
        marginTop:70
    },
    buttonWrap: {
        backgroundColor: "#349319",
        borderRadius: 0,
        padding: 20,
        alignSelf: 'stretch',

    },
    button: {
        alignSelf: 'stretch'
    },
    buttonText: {
        color: "#ffffff",
        fontSize:16
    },
    heading: {
        fontSize: 20
    },
});


module.exports = GlobalStyles;
