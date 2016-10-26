'use strict';

import React, { Component } from 'react';
import { Text, StatusBar, View, AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';
import GlobalStyles from './GlobalStyles';
import Welcome from '../views/Welcome';

const packageJSON = require('../package.json');



class App extends Component {

    constructor() {
        super();
        this.state = {
            navigationBarHidden: false
        }
    }

    toggleNavBar = () => {
        this.setState({
            navigationBarHidden: !this.state.navigationBarHidden
        });
    }

    render() {
        const {rootProps} = this.props;
        return (
            <View style={GlobalStyles.navWrap}>
            <StatusBar barStyle='light-content' />
            <NavigatorIOS
            ref="Nav"
            tintColor="#ffffff"
            barTintColor={packageJSON.branding.color}
            titleTextColor="#ffffff"
            navigationBarHidden={this.state.navigationBarHidden}
            initialRoute={{
                component: Welcome,
                title: "InSeason",
                passProps:{toggleNavBar: this.toggleNavBar}
            }}
            style={GlobalStyles.nav}
            />
            </View>
        );
    }
}

module.exports = App;
