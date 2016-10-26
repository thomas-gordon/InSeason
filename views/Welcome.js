'use strict';

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableWithoutFeedback, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import About from './About';
import GlobalStyles from '../components/GlobalStyles';
const questionIcon = (<Icon name="question-circle-o" size={20} color="#fff" />)

class Welcome extends Component {
    _goToAbout = () => {
        //this.props.toggleNavBar();
        this.props.navigator.push({
            title: "About InSeason",
            component: About
        });
    }
    render() {
        return (
            <View style={GlobalStyles.appWrapper}>

                <ScrollView contentContainerStyle={GlobalStyles.centerView}>
                    <Text>Welcome to the app that is an app</Text>
                </ScrollView>

                <View style={GlobalStyles.container}>
                    <View style={GlobalStyles.buttonWrap}>
                    <TouchableWithoutFeedback onPress={this._goToAbout}>
                        <View style={GlobalStyles.button}>

                            <Text style={GlobalStyles.buttonText}>{questionIcon} Tell me about InSeason</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    </View>
                </View>
                
            </View>
        );
    }
}

module.exports = Welcome;
