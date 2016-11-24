'use strict';

import React, { Component } from 'react';
import {  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ScrollView} from 'react-native';

import MonthsAvailable from './MonthsAvailable';

import IconFA from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'flex-start',
    padding:15
  },
  tabText: {
    color: 'white',
    margin: 10,
    padding:5
  },
});


class TabBarExample extends Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'TabBarExample';

  state = {
    selectedTab: 'seasonalityTab'
  };

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="gray"
        tintColor="white"
        barTintColor="rgba(0,0,0,0.1)"
        translucent={true}>
        <IconFA.TabBarItem
          selected={this.state.selectedTab === 'seasonalityTab'}
          title="When to buy"
          iconSize={20}
          iconName="calendar"
          iconColor="gray"
          renderAsOriginal={true}
          selectedIconName="calendar"
          selectedIconColor="white"
          onPress={() => {
            this.setState({
              selectedTab: 'seasonalityTab',
            });
          }}>
          <View style={styles.tabContent}>
            <MonthsAvailable monthsAvailable={this.props.item.monthsSeason} />
          </View>
        </IconFA.TabBarItem>

        <IconFA.TabBarItem
          title="Description"
          selected={this.state.selectedTab === 'redTab'}
          iconName="eye"
          iconColor="gray"
          selectedIconColor="white"
          iconSize={20}
          renderAsOriginal={true}
          selectedIconName="eye"
          onPress={() => {
            this.setState({
              selectedTab: 'redTab'
            });
          }}>
          <View style={styles.tabContent}>
              <Text>
                {this.props.item.detail}
              </Text>
          </View>
        </IconFA.TabBarItem>

      </TabBarIOS>
    );
  }
}


module.exports = TabBarExample;
