import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, FlatList, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import CurrencyDropdown from "./CurrencyDropdown";
import { RateTableItem } from "./RateTableItem";
import currencyList from './currencyList.json';

import { styles } from "./Stylesheet";
import currentRateAPI from "./currentRateAPI";

export function ExchageRateTable() {

    let [fromCurrency, setFromCurrency] = useState("THB");
    let [fromAmount, setFromAmount] = useState(100.00);
    let [rate, setRate] = useState(null);
    let [currentDate, setCurrentDate] = useState(null);

    // Get the current currency exchange rate from the API
    useEffect(() => { 
        async function fetchRate(){
          currentRateAPI().then((data) => { setRate(data.rates);}).catch((error) => { 
            Toast.show({ type: 'error', text1: 'Error', text2: error.message, position: 'bottom', autoHide: false, topOffset: 30, bottomOffset: 40, });
          });
        }

        function getCurrentDateString(){
            let date = new Date();
            let year = date.getFullYear();
            let MonthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let monthname = MonthArray[date.getMonth()];
            let day = date.getDate();
            let weekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let weekday = weekdayArray[date.getDay()];
            return `${weekday}, ${day} ${monthname} ${year}`;
        }
        fetchRate();
        setCurrentDate(getCurrentDateString());
    }, []);

    const handleFromAmount = (input) => { setFromAmount(input ? input : 0); }
    const handleFromCurrency = (input) => { setFromCurrency(input); }

    return (
        <SafeAreaView style={[styles.container, styles.justifyContextFlexStart]}>
            <Text style={styles.textHeading}>Exchange{'\n'}Rate Table</Text>
            <Text style={styles.fs16}>As of {currentDate}</Text>
            <View>
                <Text style={styles.textSubHeading}>From</Text>
                <CurrencyDropdown value={fromCurrency} defaultValueIndex={27} 
                  borderRadius={{topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0}}
                  onSelect={(selectedItem) => { handleFromCurrency(selectedItem.symbol); }} />
                <TextInput keyboardType="numeric" style={styles.textInputBox} defaultValue={"100.00"} onChangeText={handleFromAmount} />
            </View>

            <View style={styles.rateTableList}>
              <Text style={styles.textSubHeading}>To</Text>
              <FlatList
                style={styles.rateTableSize}
                data={currencyList.currency}
                renderItem={({item}) => (
                  <RateTableItem item={item} amount={(rate) ? (fromAmount * rate[item.symbol] / rate[fromCurrency]).toFixed(2) : 0}/>
                )} keyExtractor={item => item.symbol}
              />
            </View>
            <Toast />
        </SafeAreaView>
    );
}
