'use strict';

import React, { Component } from 'react';
import { Text, View, WebView, StyleSheet, ScrollView, TouchableWithoutFeedback, StatusBar} from 'react-native';
import GlobalStyles from '../components/GlobalStyles';

class About extends Component {

    _handleChangePage = () => {
        this.props.navigator.push({
            title: "Welcome Page",
            component: Welcome
        });
    }

    render() {
        return (
            <View style={GlobalStyles.webviewWrapper}>
                <WebView source={{uri:"about.html"}} />
            </View>
        );
    }
}

module.exports = About;
