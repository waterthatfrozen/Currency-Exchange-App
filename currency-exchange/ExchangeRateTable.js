import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, FlatList, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import CurrencyDropdown from "./CurrencyDropdown";
import currencyList from './currencyList.json';

import { styles } from "./Stylesheet";
import currentRateAPI from "./currentRateAPI";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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
        <SafeAreaView style={[styles.container, {justifyContent: 'flex-start'}]}>
            <Text style={styles.textHeading}>Exchange{'\n'}Rate Table</Text>
            <Text style={{fontSize: 16}}>As of {currentDate}</Text>
            <View style={{ alignItems: 'flex-start' }}>
                <Text style={{fontSize: 22, marginVertical: 10}}>From</Text>
                <CurrencyDropdown value={fromCurrency} defaultValueIndex={27} 
                  borderRadius={{topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0}}
                  onSelect={(selectedItem) => { handleFromCurrency(selectedItem.symbol); }} />
                <TextInput keyboardType="numeric" style={styles.textInputBox} defaultValue={"100.00"} onChangeText={handleFromAmount} />
            </View>

            <View style={{ alignItems: 'flex-start', paddingBottom: 100}}>
              <Text style={{fontSize: 22, marginVertical: 10}}>To</Text>
              <FlatList
                style={{width: SCREEN_WIDTH*0.9, height: SCREEN_HEIGHT*0.5}}
                data={currencyList.currency}
                renderItem={({ item }) => (
                  <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'flex-start', marginVertical: 2, borderRadius: 5, borderWidth: 1}}>
                    <View style={{flex: 1, flexDirection:'column', paddingVertical: 5}}>
                      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.flag} {item.symbol}</Text>
                      <Text style={{fontSize: 16}}>{item.name}</Text>
                    </View>
                    <View style={{backgroundColor: '#09264A', flex: 1, padding: 5, marginLeft: 10, borderRadius: 5}}>
                      <Text style={{fontSize: 20, marginLeft: 10, color: '#F99820', fontWeight: 'bold'}}>{(rate) ? (fromAmount * rate[item.symbol] / rate[fromCurrency]).toFixed(2) : 0}</Text>
                    </View>
                  </View>
                )} keyExtractor={item => item.symbol}
              />
            </View>
            <Toast />
        </SafeAreaView>
    );
}
