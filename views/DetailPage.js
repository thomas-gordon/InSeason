'use strict';

import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TabBarIOS } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';
import DetailTabBar from '../components/DetailTabBar';
const detailStyles = StyleSheet.create({
    header: {
        flex:0,
        flexDirection: 'row',
        paddingTop:64,
        height:160,
        borderBottomColor: 'gray',
        borderBottomWidth:1
    },
    spacer: {
        flexBasis:20
    },
    description: {
        padding:20
    },
    headerLeft: {
        flex:0,
        width:70,
        height:70,
        paddingTop:20,
        paddingLeft:10
    },
    headerRight:{
        flex:1
    },
    image: {
        width:50,
        height:50
    },
    heading: {
        fontSize:20
    },
    paragraph: {
        fontSize:16
    },
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    }
});

class DetailPage extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={detailStyles.header}>
                    <View style={detailStyles.headerLeft}>
                        <Image source={this.props.item.image} style={detailStyles.image} />
                    </View>
                    <View style={detailStyles.headerRight}>
                        <View style={{flex:1, flexDirection:'column', justifyContent: 'center'}}>
                            <Text style={detailStyles.heading} numberOfLines={1} >{`${this.props.item.type}`}</Text>
                            <Text style={detailStyles.paragraph}>{`${this.props.item.varietal}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <DetailTabBar item={this.props.item}/>
                </View>
            </View>
        );
    }
}

module.exports = DetailPage;
