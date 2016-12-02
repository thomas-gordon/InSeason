'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

const aboutStyles = StyleSheet.create({
    wrap: {
        flex:1,
        padding:20,
    },
    texty: {
        fontSize:20,
        lineHeight:24
    }
});

class About extends Component {

    render() {
        return (
            <ScrollView style={aboutStyles.wrap}>
                <Text style={aboutStyles.texty}>Ah, apps. There are so many <Bold>test</Bold>. This is an app I made! It {"isn't"} done.</Text>
            </ScrollView>
        );
    }
}

module.exports = About;
