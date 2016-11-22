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
        if (this.props.item.image !== '') {
            this.state = {
                image: true
            }
        } else {
            this.state = {
                image: false
            }
        }
    }

    _handleBackPress() {
        this.props.navigator.pop();
    }

    _handleNextPress(nextRoute) {
        this.props.navigator.push(nextRoute);
    }

    _renderTitle(rootProps) {
        console.log(rootProps.item.type !== '');
        return rootProps.item.type !== '' ? `${rootProps.item.type} - ${rootProps.item.varietal}` : `${rootProps.item.varietal}`
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
                        {function(){
                            if (this.state.image) {
                              return <Image source={rootProps.item.image} style={styles.photo}/>
                            }
                        }.call(this)}
                        <Text style={styles.text}>
                            {this._renderTitle(rootProps)}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
};

export default SearchRow;
