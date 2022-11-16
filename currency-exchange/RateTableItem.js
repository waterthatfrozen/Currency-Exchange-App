import React from "react";
import { View, Text } from "react-native";

import { styles } from "./Stylesheet";

export function RateTableItem(props){
    return(
        <View style={styles.rateTableItem}>
        <View style={styles.rateTableItemLeft}>
            <Text style={styles.dropdownHighlightItemText}>{props.item.flag} {props.item.symbol}</Text>
            <Text style={styles.fs16}>{props.item.name}</Text>
        </View>
        <View style={styles.rateTableItemRight}>
            <Text style={styles.rateTableItemRightText}>{props.amount}</Text>
        </View>
        </View>
    );
}