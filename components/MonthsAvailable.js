'use strict';

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';
import Moment from 'moment';

class MonthsAvailable extends Component {
    constructor(props) {
        super(props);

        //presented in the format: '1-2, 3-5'
        console.log(this.props.monthsAvailable);

        //convert the month strings into a nice time calendar
        //moment().month(Number|String);
        //http://stackoverflow.com/questions/29914572/react-native-flex-not-responding-to-orientation-change
        this.state = {
            initialText: this.props.monthsAvailable
        }
    }

    _renderMonth() {

    }

    render() {
        return (
            <View style={{flex:1}}>
                <Text>{this.state.initialText}</Text>
            </View>
        )
    }
}

module.exports = MonthsAvailable;
