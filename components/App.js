'use strict';

import React, { Component } from 'react';
import { Text, StatusBar, View, StyleSheet, NavigatorIOS } from 'react-native';
import GlobalStyles from './GlobalStyles';
import packageJSON from '../package';
import HomePage from '../views/HomePage';
import AboutPage from '../views/AboutPage';
import DetailPage from '../views/DetailPage';
import data from '../data/data';

var Orientation = require('react-native-orientation');

export default class App extends Component {
    componentDidMount() {
        Orientation.lockToPortrait();
        //this will lock the view to Portrait
    }
    render() {
        const {rootProps} = this.props;
        return (
            <View style={{flex:1}}>
                <StatusBar
                barStyle="light-content"
                />
                <NavigatorIOS
                ref="nav"
                tintColor="#ffffff"
                barTintColor={packageJSON.branding.color}
                titleTextColor="#ffffff"
                style={{flex:1}}
                rightButtonTitle='About'
                initialRoute={{
                    // title: data[0].varietal,
                    // component: DetailPage,
                    // passProps: {
                    //     item:data[0]
                    // },

                    component: HomePage,
                    title: packageJSON.name,

                    onRightButtonPress: () => {
                        this.refs.nav.navigator.push({
                            title: "About",
                            component: AboutPage,
                            rightButtonTitle: ''
                        })
                    }
                }}
                />
            </View>
        );
    }
}

module.exports = App;
