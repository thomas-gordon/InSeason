import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, ListView } from 'react-native';
import DetailPage from '../views/DetailPage';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});

class SearchRow extends Component {
    constructor(props) {
        super(props);
    }

    _handleBackPress() {
        this.props.navigator.pop();
    }

    _handleNextPress(nextRoute) {
        this.props.navigator.push(nextRoute);
    }

    render() {
        const rootProps = this.props;
        const nextRoute = {
            component: DetailPage,
            title: `${rootProps.item.type} -  ${rootProps.item.varietal}`,
            passProps: { item: rootProps.item },
            rightButtonTitle: ''
        };

        return (
            <View>
                <TouchableHighlight
                underlayColor="#cccccc"
                onPress={() => this._handleNextPress(nextRoute)}>
                    <View style={styles.container}>
                        <Image source={rootProps.item.image} style={styles.photo}/>
                        <Text style={styles.text}>
                        {`${rootProps.item.type} - ${rootProps.item.varietal}`}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
};

export default SearchRow;
