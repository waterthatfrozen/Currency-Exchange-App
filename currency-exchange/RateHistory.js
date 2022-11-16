import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";
import CurrencyDropdown from "./CurrencyDropdown";
import { styles } from "./Stylesheet";
import historyRateAPI from "./historyRateAPI";
import { SwapButton } from "./SwapButton";
import { RateChart } from "./RateChart";

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
        <SafeAreaView style={[styles.container, styles.justifyContextFlexStart]}>
            <Text style={styles.textHeading}>Exchange Rate{'\n'}History Chart</Text>
            <View style={styles.alignItemsFlexStart}>
                <Text style={[styles.textSubHeading, styles.mt5]}>From</Text>
                <CurrencyDropdown value={fromCurrency} defaultValueIndex={28}
                    borderRadius={{topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10}}
                    onSelect={(selectedItem) => { handleFromCurrency(selectedItem.symbol); }} />
                <View style={styles.subContainer}>
                    <SwapButton onPress={handleSwap}/>
                </View>
                <Text style={[styles.textSubHeading, styles.mt5]}>To</Text>
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
