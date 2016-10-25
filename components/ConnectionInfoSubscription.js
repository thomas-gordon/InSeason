'use strict';

import React, { Component } from 'react';
import { NetInfo, Text, View, TouchableWithoutFeedback, } from 'react-native';

class ConnectionInfoSubscription extends Component {
  state = {
    connectionInfoHistory: [],
  };

  componentDidMount() {
    NetInfo.addEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  }

  _handleConnectionInfoChange = (connectionInfo) => {
    const connectionInfoHistory = this.state.connectionInfoHistory.slice();
    connectionInfoHistory.push(connectionInfo);
    this.setState({
      connectionInfoHistory,
    });
  };

  render() {
    return (
        <View>
          <Text style={this.props.alignment}>
          {"What network are ye on!?\n"}{JSON.stringify(this.state.connectionInfoHistory)}
          </Text>
        </View>
    );
  }
}
module.exports = ConnectionInfoSubscription;
