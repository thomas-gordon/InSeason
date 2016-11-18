'use strict';

import React, { Component } from 'react';
import { Text, TextInput, View, TouchableWithoutFeedback, Modal, TouchableHighlight } from 'react-native';

import GlobalStyles from '../components/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
const filterIcon = (<Icon name="filter" size={20} color="#fff" />);
const { BlurView, VibrancyView } = require('react-native-blur');

import AboutPage from './AboutPage';
import SearchView from '../components/SearchView';


class HomePage extends Component {
    state = {
        modalVisible: false,
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    render() {
        return (
            <View style={{flex:1, backgroundColor:'white'}}>

                <SearchView navigator={this.props.navigator}/>

                <TouchableHighlight style={GlobalStyles.stickyFooter} onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                    <View >
                        <Text style={GlobalStyles.stickyButton}>
                        {filterIcon}{"\n"}
                        filter
                        </Text>
                    </View>
                </TouchableHighlight>

                <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.modalVisible}
                animationType={'fade'}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={{backgroundColor: 'rgba(255,255,255, 0.4)', flex:1, }}>
                        <BlurView blurType="light" blurAmount={90} style={{padding:20, backgroundColor: 'rgba(255,255,255, 0.8)', flex:1, alignSelf: "stretch" }}>
                            <Text>Hello World!</Text>
                            <TouchableHighlight onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </BlurView>
                    </View>
                </Modal>

            </View>
        );
    }
}

module.exports = HomePage;
