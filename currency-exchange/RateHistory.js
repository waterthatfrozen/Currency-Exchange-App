import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, FlatList, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import CurrencyDropdown from "./CurrencyDropdown";
import { styles } from "./Stylesheet";
import historyRateAPI from "./historyRateAPI";
import { SwapButton } from "./SwapButton";
import { RateChart } from "./RateChart";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export function RateHistory() {

    let [fromCurrency, setFromCurrency] = useState("USD");
    let [toCurrency, setToCurrency] = useState("THB");
    let [historyRate, setHistoryRate] = useState(null);
    let [timestampXAxis, setTimestampXAxis] = useState(null);
    let [rateYAxis, setRateYAxis] = useState(null);

    useEffect(() => { 
        async function fetchRate(){
            let result = await historyRateAPI();
            setHistoryRate(result.rates);
            let timestamp_x = [];
            let timestamp = Object.keys(result.rates);
            timestamp.map((item) => { timestamp_x.push(item.split("-").reverse().splice(0,2).join("/")); });
            setTimestampXAxis(timestamp_x);
            let temp = [];
            for(const element of Object.keys(result.rates)){
                temp.push(result.rates[element][toCurrency] / result.rates[element][fromCurrency]);
            }
            setRateYAxis(temp);
            console.log(rateYAxis); console.log(timestamp_x);
        }
        fetchRate();
    }, []);

    useEffect(() => {
        if(historyRate !== null){
            let temp = [];
            for(const element of Object.keys(historyRate)){
                temp.push(historyRate[element][toCurrency] / historyRate[element][fromCurrency]);
            }
            setRateYAxis(temp);
        }
    }, [fromCurrency, toCurrency]);

    const handleFromCurrency = (input) => { setFromCurrency(input); }
    const handleToCurrency = (input) => { setToCurrency(input); }
    const handleSwap = () => { let temp = fromCurrency; setFromCurrency(toCurrency); setToCurrency(temp); }

    return (
        <SafeAreaView style={[styles.container, {justifyContent: 'flex-start'}]}>
            <Text style={styles.textHeading}>Exchange Rate{'\n'}History Chart</Text>
            <View style={{ alignItems: 'flex-start' }}>
                <View style={{flexDirection:'column'}}>
                <Text style={{fontSize: 22, marginVertical: 5}}>From</Text>
                <CurrencyDropdown value={fromCurrency} defaultValueIndex={28} style={{width: SCREEN_WIDTH * 0.4}}
                  borderRadius={{topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10}}
                  onSelect={(selectedItem) => { handleFromCurrency(selectedItem.symbol); }} />
                </View>

                <View style={{alignItems: 'flex-start', marginTop: 10, marginBottom: 5}}>
                    <SwapButton onPress={handleSwap}/>
                </View>

                <Text style={{fontSize: 22, marginBottom: 5}}>To</Text>
                <CurrencyDropdown value={toCurrency} defaultValueIndex={27} 
                  borderRadius={{topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10}}
                  onSelect={(selectedItem) => { handleToCurrency(selectedItem.symbol); }} />
            </View>
            { (timestampXAxis === null || rateYAxis === null) ? <Text>Initializing Graph...</Text>
            : <RateChart labels={timestampXAxis} data={rateYAxis} style={styles.chartView} /> }
            <Toast />
        </SafeAreaView>
    );
}
