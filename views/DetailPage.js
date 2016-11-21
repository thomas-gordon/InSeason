'use strict';

import React, { Component } from 'react';
import { View, WebView, Text,ScrollView } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';

class DetailPage extends Component {
    constructor() {
        super();

    }
    componentDidMount() {

    }
    render() {
        return (
            <ScrollView style={{flex:1}}>
                <Text>
                {`${this.props.item.varietal}`} is a hehe
                </Text>
            </ScrollView>
        );
    }
}

module.exports = DetailPage;
