/*
* Removed for brevity
*/
import React, { Component } from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet, Image, ListView } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';
import SearchRow from './SearchRow';
var SearchBar = require('react-native-search-bar');
import demoData from '../data/data';
var dismissKeyboard = require('dismissKeyboard')

class SearchView extends Component {
    constructor(props) {
        super(props)

        const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
        const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
            getSectionData,
            getRowData,
        });

        const { dataBlob, sectionIds, rowIds } = this.formatData(demoData);

        this.state = {
            dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
            navigator: this.props.navigator,
            loaded: true
        }
    }

    formatData(data) {
        // We're sorting by alphabetically so we need the alphabet
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        // Need somewhere to store our data
        const dataBlob = {};
        const sectionIds = [];
        const rowIds = [];

        // Each section is going to represent a letter in the alphabet so we loop over the alphabet
        for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
            // Get the character we're currently looking for
            const currentChar = alphabet[sectionId];

            // Get users whose first name starts with the current letter
            const users = data.filter((item) => item.varietal.toUpperCase().indexOf(currentChar) === 0);

            // If there are any users who have a first name starting with the current letter then we'll
            // add a new section otherwise we just skip over it
            if (users.length > 0) {
                // Add a section id to our array so the listview knows that we've got a new section
                sectionIds.push(sectionId);

                // Store any data we would want to display in the section header. In our case we want to show
                // the current character
                dataBlob[sectionId] = { character: currentChar };

                // Setup a new array that we can store the row ids for this section
                rowIds.push([]);

                // Loop over the valid users for this section
                for (let i = 0; i < users.length; i++) {
                    // Create a unique row id for the data blob that the listview can use for reference
                    const rowId = `${sectionId}:${i}`;

                    // Push the row id to the row ids array. This is what listview will reference to pull
                    // data from our data blob
                    rowIds[rowIds.length - 1].push(rowId);

                    // Store the data we care about for this row
                    dataBlob[rowId] = users[i];
                }
            }
        }

        return { dataBlob, sectionIds, rowIds };
    }

    filterSearch(searchInput) {
        searchInput = searchInput ? searchInput.toLowerCase() : 0;
        return demoData.filter(function (e) {
            if (searchInput && e.item.varietal.toLowerCase().indexOf(searchInput) === -1) {
                return false
            }
            return true
        })
    }

    refineSearch(text) {
        let searchInput = text.toLowerCase();
        let filteredData = this.filterSearch(searchInput);
        let { dataBlob, sectionIds, rowIds } = this.formatData(filteredData);
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

    render() {
        return (
            //The height of the navigator bar is 64
            <View style={{backgroundColor: 'white', marginTop:64}}>
                <SearchBar
                    ref='searchBar'
                    height={60}
                    placeholder='Search'
                    onChangeText={(text) => this.refineSearch(text)}
                    onSearchButtonPress={(text) => console.log('searching for ', text)}
                    onCancelButtonPress={(text) => this.closeKeyboard()}
                    />
                <ListView
                    keyboardDismissMode={"on-drag"}
                    style={{alignSelf: "stretch", paddingBottom: 300 }}
                    //the list view doesn't size correctly unless this is set here.
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.dataSource}
                    renderSectionHeader={this.renderSectionHeaderz}
                    renderRow={(props) => <SearchRow navigator={this.state.navigator} item={props} />}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={GlobalStyles.separator} />}
                />
            </View>
        );
    }
}

export default SearchView;
