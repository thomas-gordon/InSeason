'use strict';

import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';

class About extends Component {

    render() {
        return (
            <View style={GlobalStyles.webviewWrapper}>
                <WebView source={{uri:"about.html"}} loading={true} scalesPageToFit={true}  />
            </View>
        );
    }
}

module.exports = About;
