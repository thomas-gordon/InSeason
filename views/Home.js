'use strict';

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableWithoutFeedback, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const filterIcon = (<Icon name="filter" size={20} color="#fff" />)
import SearchView from '../components/SearchView';
import About from './About';
import GlobalStyles from '../components/GlobalStyles';

class Home extends Component {
    render() {
        return (
            <View style={GlobalStyles.appWrapper}>
                <ScrollView >
                    <SearchView />
                </ScrollView>
                <View style={GlobalStyles.stickyFooter}>
                    {filterIcon}
                    <Text style={GlobalStyles.stickyButton}>filter</Text>
                </View>
            </View>
        );
    }
}

module.exports = Home;
