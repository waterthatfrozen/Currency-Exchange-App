import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import CaretDownFill from 'react-native-bootstrap-icons/icons/caret-down-fill';
import Search from 'react-native-bootstrap-icons/icons/search';
import currencyList from './currencyList.json';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default (props) => {
    return (
    <SelectDropdown
        data={currencyList.currency}
        defaultValueByIndex={(props.value === null) ? props.defaultValueIndex : currencyList.currency.findIndex((item) => item.symbol == props.value)}
        disableAutoScroll={true}
        search={true}
        searchPlaceHolderText={'Search Currency'}
        searchPlaceHolderColor={'#000'}
        searchInputStyle={{color: 'black', borderBottomWidth: 1}}
        renderSearchInputLeftIcon={() => { return <Search color={'black'}/> }}
        buttonStyle={{width: SCREEN_WIDTH*0.9, backgroundColor: '#2081F9', borderTopLeftRadius: props.borderRadius.topLeft, borderTopRightRadius: props.borderRadius.topRight, borderBottomLeftRadius: props.borderRadius.bottomLeft, borderBottomRightRadius: props.borderRadius.bottomRight}}
        dropdownStyle={{width: SCREEN_WIDTH*0.9, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1}}
        defaultButtonText={'Select Currency'}
        onSelect={props.onSelect}
        renderDropdownIcon={isOpened => { return <CaretDownFill color={'white'}/> }}
        dropdownIconPosition={'right'}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.flag} {item.symbol}</Text>
              <Text style={{fontSize: 16, marginLeft: 10}}>{item.name}</Text>
            </View>
          )
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{selectedItem ? selectedItem.flag + " " + selectedItem.symbol : "Select Currency"}</Text>
              <Text style={{fontSize: 16, marginLeft: 10, color: 'white'}}>{selectedItem ? selectedItem.name : ""}</Text>
            </View>
          )
        }}
      />
    );
}