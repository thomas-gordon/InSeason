'use strict';

import React, { Component } from 'react';
import { Text, StatusBar, View, AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';
import GlobalStyles from './GlobalStyles';
import About from '../views/About';
import Home from '../views/Home';
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
                ref="nav"
                tintColor="#ffffff"
                barTintColor={packageJSON.branding.color}
                titleTextColor="#ffffff"
                rightButtonTitle= 'About'
                navigationBarHidden={this.state.navigationBarHidden}
                style={GlobalStyles.nav}
                initialRoute={{
                    component: Home,
                    title: "InSeason",
                    onRightButtonPress: () => {
                        this.refs.nav.navigator.push({
                            title: "About",
                            component: About,
                            rightButtonTitle: ''
                        })
                    }}
                }
            />
            </View>
        );
        }
    }

    module.exports = App;
