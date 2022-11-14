import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

let {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: 15
    },
    chartView: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 2 / 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 15,
    },
    tabButtonUnfocused: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabButtonFocused: {
        flex: 1,
        backgroundColor: '#09264A',
    },
    textUnfocused: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'normal'
    },
    textFocused: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    }
});