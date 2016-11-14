'use strict'

import React, { Component } from 'react';
import { Text, StatusBar, View, AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';

const GlobalStyles = StyleSheet.create({
    appWrapper: {
        flex:1,
        flexDirection: 'column',
    },
    webviewWrapper: {
        flex:1,
        flexDirection: 'column',
    },
    centerView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding:20
    },
    container: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    separator: {
       borderBottomColor: '#bbb',
       borderBottomWidth: StyleSheet.hairlineWidth,
    },
    stickyFooter: {
        flex:1,
        position:'absolute',
        bottom:5,
        right:20,
        alignItems: 'center',
        backgroundColor: "#349319",
        padding:5,
        paddingRight:15,
        paddingLeft:15

    },
    stickyButton: {
        color:'#ffffff',
        textAlign:'center'
    },
    nav: {
        flex: 1
    },
    navWrap: {
        flex: 1
    },
    searchWrap: {
        flex: 1,
        marginTop:61
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
