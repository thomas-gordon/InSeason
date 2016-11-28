import React, { Component } from 'react';
import {
    View,
    AsyncStorage,
    Text, Alert,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ActivityIndicator,
    Animated,
    TextInput
} from 'react-native';

import Moment from 'moment';

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
        height:35,
        margin:5,
        marginRight:50,
        marginLeft:50
    },
    buttonBar: {
        flexDirection:'row',
        flex:2,
        flexGrow:3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height:30,
        justifyContent: 'center',
        flex:1,
        borderColor:'gray',
        borderWidth:1,
        marginLeft:2,
        marginRight:2,
        borderRadius:5
    },
    buttonText: {
        color:'gray',
        textAlign:'center'
    },
    buttonActive: {
        backgroundColor:'green',
        height:30,
        justifyContent: 'center',
        flex:1,
        marginLeft:2,
        marginRight:2,
        borderRadius:5
    },
    buttonActiveText: {
        color:'white',
        textAlign:'center'
    },
    searchView: {
        padding:10,
        backgroundColor:'#ccc'
    },
    searchInput: {
        flex:1,
        height:40,
        borderColor:'#ccc',
        borderWidth:1,
        borderRadius:5,
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#ffffff'
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
        this._loadInitialState().done();
        this.clearText = this.clearText.bind(this);
        this.state = {
            navigator: this.props.navigator,
            messages: [],
            isLoading: true,
            searchText: '',
            orderBy:''
        }
    }
    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null){
                this._updateOrder(value);
                return value
            } else {
                this._updateOrder(FILTERS[1][0], true);
            }
        } catch (error) {
            this._updateOrder(FILTERS[1][0], true);
        }
    };

    _updateOrder = async (orderBy, setNewOrder) => {
        let orderByElement = FILTERS.find(function (item) {
            return item[0] === orderBy
        });

        try {
            if (setNewOrder === true) {
                await AsyncStorage.setItem(STORAGE_KEY, orderBy);
            }
            const { dataBlob, sectionIds, rowIds } = this.formatData(demoData, orderByElement[1]);

            const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
            const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
                getSectionData,
                getRowData,
            });

            //scroll the scroller to the top if it exists!
             if (this.refs.scroller) {
                 this.refs.scroller.scrollTo({x:0,y:0,animated:true});
             }
             if (this._textInput) {
                 this._textInput.setNativeProps({text:''})
             }

            this.setState({
                dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
                orderBy: orderByElement[1],
                isLoading: false,
                searchText: ''
            });

        } catch (error) {
            Alert.alert('Something went wrong saving your choice. Try again?' + error)
        }
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
                 } else {
                    let currentMonthIndex = sectionId + 1;
                    return item.monthsSeason.indexOf(currentMonthIndex) !== -1;
                }
            });

            //alphabetize the items!
            items.sort((a,b) => {
                var x = a['varietal'];
                var y = b['varietal'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
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

    clearText() {
         this._textInput.setNativeProps({text: ''});
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
            <View style={{backgroundColor:'#dddddd', padding:10}}>
                <Text style={{color:'#000000'}}>{`${sectionData.character}`}</Text>
            </View>
        );
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
                <View style={styles.searchView}>
                    <TextInput
                        style={styles.searchInput}
                        ref={component => this._textInput = component}
                        placeholder='Search'
                        onChangeText={(text) => this.refineSearch(text)}
                        onSearchButtonPress={(text) => console.log('searching for ', text)}
                        onCancelButtonPress={(text) => this.closeKeyboard()}
                    />
                </View>

                <View style={styles.bar}>
                    <View style={styles.buttonBar}>
                        <View>
                            <Text>
                                Show:
                            </Text>
                        </View>
                        <TouchableOpacity
                        style={(this.state.orderBy === FILTERS[1][1]) ? styles.buttonActive : styles.button }
                        onPress={() => this._updateOrder(FILTERS[1][0])}>
                            <Text style={(this.state.orderBy === FILTERS[1][1]) ? styles.buttonActiveText : styles.buttonText }>In Season</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={(this.state.orderBy === FILTERS[1][1]) ? styles.buttonActive : styles.button }
                        onPress={() => this._updateOrder(FILTERS[0][0])}
                        style={(this.state.orderBy === FILTERS[0][1]) ? styles.buttonActive : styles.button}>
                            <Text style={(this.state.orderBy === FILTERS[0][1]) ? styles.buttonActiveText : styles.buttonText }>A-Z</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {function(){
                    if (this.state.dataSource) {
                      return <ListView
                          ref="scroller"
                          keyboardDismissMode={"on-drag"}
                          style={{alignSelf: "stretch", paddingBottom: 300 }}
                          automaticallyAdjustContentInsets={false}
                          dataSource={this.state.dataSource}
                          renderSectionHeader={this.renderSectionHeaderz}
                          renderRow={(props) => <SearchRow navigator={this.state.navigator} item={props} />}
                          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                          />
                    }
                }.call(this)}

                {function(){
                    if (this.state.isLoading === true) {
                      return <ActivityIndicator
                         animating={true}
                         style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 8,
                          height: 80,
                          }}
                         size="large"
                       />
                    }
                }.call(this)}

            </View>
        );
    }
}

export default SearchView;
