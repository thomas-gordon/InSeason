import React, { Component } from 'react';
import {
    View,
    AsyncStorage,
    Text, Alert,
    TouchableOpacity,
    StyleSheet,
    ListView
} from 'react-native';

import Moment from 'moment';

import SearchBar from 'react-native-search-bar';

import SearchRow from './SearchRow';
import demoData from '../data/data';

const styles = StyleSheet.create({
    separator: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    bar: {
        flex:1,
        flexDirection:'column',
        height:50,
        margin:20
    },
    buttonBar: {
        flexDirection:'row',
        flex:2,
        flexGrow:3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor:'red',
        height:50,
        justifyContent: 'center',
        flex:1,
        marginLeft:2,
        marginRight:2
    },
    buttonText: {
        color:'white',
        textAlign:'center'
    }

});

//Order by alpha reference
const alphabetOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

//Order by month reference
let monthCount = 0;
const monthsOrder = [];
while (monthCount < 12) {
    monthsOrder.push(Moment().month(monthCount++).format("MMMM"));
}

//order by current month IE current month = Feb, show feb first and january last.
const currentMonthIndex = Moment().month();
let seasonCount = 0;
let seasonsOrder = [];
for (i=currentMonthIndex; i < monthsOrder.length; i++) {
  seasonsOrder.push(monthsOrder[i])
}
let trimmedMonths = monthsOrder.slice(0,currentMonthIndex);
for (i=0; i< trimmedMonths.length; i++) {
  seasonsOrder.push(trimmedMonths[i])
}

const FILTERS = [
    ['alpha',alphabetOrder],
    ['season', seasonsOrder],
    ['months', monthsOrder]
];

const STORAGE_KEY = '@SearchView:orderBy';

class SearchView extends Component {
    constructor(props) {
        super(props);
        //this is a little harder. let's do it later!
        //this._loadInitialState().done();

        //const { dataBlob, sectionIds, rowIds } = this.formatData(demoData, AsyncStorage.getItem(STORAGE_KEY));
        const { dataBlob, sectionIds, rowIds } = this.formatData(demoData, FILTERS[2][1]);

        const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
        const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
            getSectionData,
            getRowData,
        });

        this.state = {
            dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
            navigator: this.props.navigator,
            loaded: true,
            orderBy: FILTERS[2][1],
            messages: [],
            isLoading: true
        }

    }
    //1. get the initial key.
    //2. using it if it's defined, pass to the data formatter.
    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null){
                this.setState({orderBy: value});
                this._appendMessage('Recovered selection from disk: ' + value);
                return value
            } else {
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    };

    _updateOrder(orderBy) {
        const { dataBlob, sectionIds, rowIds } = this.formatData(demoData, orderBy);

        const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
        const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
            getSectionData,
            getRowData,
        });

        //scroll the scroller to the top!
        this.refs.scroller.scrollTo({x:0,y:0,animated:true});

        this.setState({
            dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
            orderBy: orderBy,
        });
    }


    formatData(data, orderBy) {

        const dataBlob = {};
        const sectionIds = [];
        const rowIds = [];
        const dataTest = data;

        //Create the sections!
        for (let sectionId = 0; sectionId < orderBy.length; sectionId++) {

            const currentArrayItem = orderBy[sectionId];

            const items = data.filter((item) => {
                let itemString;
                 if (orderBy === alphabetOrder) {
                     if (item.type === '') {
                         itemString = item.varietal;
                     } else {
                         itemString = `${item.type} - ${item.varietal}`;
                     }
                     return itemString.toUpperCase().indexOf(currentArrayItem) === 0;
                 } else if (orderBy === monthsOrder || orderBy === seasonsOrder) {
                    let currentMonthIndex = sectionId + 1;
                    return item.monthsSeason.indexOf(currentMonthIndex) !== -1;
                }
            });

            if (items.length > 0) {
                // Add a section id to our array so the listview knows that we've got a new section
                sectionIds.push(sectionId);

                // Store any data we would want to display in the section header. In our case we want to show
                // the current character
                dataBlob[sectionId] = { character: currentArrayItem };

                // Setup a new array that we can store the row ids for this section
                rowIds.push([]);

                // Loop over the valid items for this section
                for (let i = 0; i < items.length; i++) {
                    // Create a unique row id for the data blob that the listview can use for reference
                    const rowId = `${sectionId}:${i}`;

                    // Push the row id to the row ids array. This is what listview will reference to pull
                    // data from our data blob
                    rowIds[rowIds.length - 1].push(rowId);

                    // Store the data we care about for this row
                    dataBlob[rowId] = items[i];
                }
            }
        }

        return { dataBlob, sectionIds, rowIds };

    }

    filterSearch(searchInput) {
        searchInput = searchInput ? searchInput.toLowerCase() : 0;

        return demoData.filter(function (e) {

                let searchString = `${e.type} - ${e.varietal}`
                if (searchInput && searchString.toLowerCase().indexOf(searchInput) === -1) {
                    return false
                }
                return true

        });
    }

    refineSearch(text) {
        let searchInput = text.toLowerCase();
        let filteredData = this.filterSearch(searchInput);
        let { dataBlob, sectionIds, rowIds } = this.formatData(filteredData, this.state.orderBy);

        let getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
        let getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];
        let ds2 = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
            getSectionData,
            getRowData,
        });

        this.setState({
            dataSource: ds2.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
        });
    }

    renderSectionHeaderz(sectionData, sectionID) {
        return (
            <View style={{backgroundColor:'#111111', padding:10}}>
                <Text style={{color:'#ffffff'}}>{`${sectionData.character}`}</Text>
            </View>
        );
    }

    changeOrder = async (orderByFilter) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, orderByFilter[0]);
            this._setMessage('Updated saved key to ' + orderByFilter[0] );
            this._setOrder(orderByFilter[0])
        } catch (error) {
            Alert.alert('Something went wrong saving your choice. Try again?')
        }
    }

    _setOrder = (orderBy) => {
        Alert.alert('order is ' + orderBy)
    }

    _setMessage = (message) => {
        this.setState({messages: message});
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    }

    render() {
        return (
            //The height of the navigator bar is 64
            <View style={{backgroundColor: 'white', marginTop:64}}>
            <SearchBar
            ref='searchBar'
            placeholder='Search'
            onChangeText={(text) => this.refineSearch(text)}
            onSearchButtonPress={(text) => console.log('searching for ', text)}
            onCancelButtonPress={(text) => this.closeKeyboard()}
            />
            <View style={styles.bar}>
                <View style={styles.buttonBar}>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._updateOrder(FILTERS[1][1])}>
                    <Text style={styles.buttonText}>In Season</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => this._updateOrder(FILTERS[0][1])}
                    style={styles.button}>
                    <Text style={styles.buttonText}>A-Z</Text>
                    </TouchableOpacity>

                </View>
                <View style={{flex:.5}}>
                    <View>
                    <Text>{this.state.messages}</Text>
                    </View>
                </View>
            </View>

            <ListView
            ref="scroller"
            keyboardDismissMode={"on-drag"}
            style={{alignSelf: "stretch", paddingBottom: 300 }}
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderSectionHeader={this.renderSectionHeaderz}
            renderRow={(props) => <SearchRow navigator={this.state.navigator} item={props} />}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            />
            </View>
        );
    }
}

export default SearchView;
