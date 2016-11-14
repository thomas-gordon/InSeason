'use strict';

import React, { Component } from 'react';
import { View, WebView, Text,ScrollView } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';

class DetailPage extends Component {
    constructor() {
        super();

    }
    componentDidMount() {
        //console.log(this.props)
    }
    render() {
        return (
            <ScrollView style={{flex:1}}>
                <Text>
                {`${this.props.name.first} ${this.props.name.last}`} is a hehe
                </Text>
            </ScrollView>
        );
    }
}

module.exports = DetailPage;
