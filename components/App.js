'use strict';

import React, { Component } from 'react';
import { Text, StatusBar, View, StyleSheet, NavigatorIOS } from 'react-native';
import GlobalStyles from './GlobalStyles';
import packageJSON from '../package';
import HomePage from '../views/HomePage';
import AboutPage from '../views/AboutPage';

export default class App extends Component {
    render() {
        const {rootProps} = this.props;
        return (
            <NavigatorIOS
                ref="nav"
                tintColor="#ffffff"
                barTintColor={packageJSON.branding.color}
                titleTextColor="#ffffff"
                style={{flex:1}}
                rightButtonTitle='About'
                initialRoute={{
                    component: HomePage,
                    title: "InSeason",
                    onRightButtonPress: () => {
                        this.refs.nav.navigator.push({
                            title: "About",
                            component: AboutPage,
                            rightButtonTitle: ''
                        })
                    }
                }}
            />
        );
    }
}

module.exports = App;
