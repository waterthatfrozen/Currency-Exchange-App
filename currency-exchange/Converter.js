import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import CurrencyDropdown from "./CurrencyDropdown";

import { styles } from "./Stylesheet";
import ArrowDownUp from 'react-native-bootstrap-icons/icons/arrow-down-up';
import currentRateAPI from "./currentRateAPI";
import { SwapButton } from "./SwapButton";

export function Converter() {

    let [fromCurrency, setFromCurrency] = useState("THB");
    let [toCurrency, setToCurrency] = useState("USD");
    let [fromAmount, setFromAmount] = useState(0.00);
    let [toAmount, setToAmount] = useState("0.00");
    let [rate, setRate] = useState(null);

    // Get the current currency exchange rate from the API
    useEffect( () => { 
        async function fetchRate(){
          currentRateAPI().then((data) => { setRate(data.rates); })
          .catch((error) => { Toast.show({ type: 'error', text1: 'Error', text2: error.message, position: 'bottom', autoHide: false, topOffset: 30, bottomOffset: 40, });});
        }
        fetchRate();
      }, []);

    // Convert the currency
    useEffect(() => {
      if(fromAmount === 0){ setToAmount("0.00"); }
      else if(fromCurrency && toCurrency && fromAmount) {
        let newToAmount = (fromAmount * rate[toCurrency] / rate[fromCurrency]).toFixed(2);
        setToAmount(newToAmount);
      }
    }, [fromCurrency, toCurrency, fromAmount]);

    const handleFromAmount = (input) => { setFromAmount(input ? input : 0); }
    const handleFromCurrency = (input) => { setFromCurrency(input); }
    const handleToCurrency = (input) => { setToCurrency(input); }
    const handleSwap = () => { 
      let temp = fromCurrency; setFromCurrency(toCurrency); setToCurrency(temp); 
      temp = fromAmount; setFromAmount(toAmount); setToAmount(temp);
    }

    return (
        <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
            <Text style={styles.textHeading}>Currency{'\n'}Converter</Text>
            <View style={{ alignItems: 'flex-start' }}>
                <Text style={{fontSize: 22, marginVertical: 10}}>From</Text>
                <CurrencyDropdown value={fromCurrency} defaultValueIndex={27} 
                  borderRadius={{topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0}}
                  onSelect={(selectedItem) => { handleFromCurrency(selectedItem.symbol); }} />
                <TextInput keyboardType="numeric" style={styles.textInputBox}
                  onChangeText={handleFromAmount} defaultValue={"0.00"}/>
            </View>

            <View style={{alignItems: 'flex-start', marginTop: 20, marginBottom: 10}}>
              <SwapButton onPress={handleSwap}/>
            </View>

            <View style={{ alignItems: 'flex-start' }}>
                <Text style={{fontSize: 22, marginVertical: 10}}>To</Text>
                <CurrencyDropdown value={toCurrency} defaultValueIndex={28} 
                  borderRadius={{topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0}}
                  onSelect={(selectedItem) => { handleToCurrency(selectedItem.symbol); }} />
                <Text style={styles.textInputBox}>
                {toAmount}</Text>
            </View>
            <Toast />
        </SafeAreaView>
    );
}
