import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ArrowLeftRight from "react-native-bootstrap-icons/icons/arrow-left-right";
import Table from "react-native-bootstrap-icons/icons/table";
import GraphUp from "react-native-bootstrap-icons/icons/graph-up";

import { BottomTabBar } from './BottomTabBar.js';
import { Converter } from './Converter';
import { RateHistory } from './RateHistory';
import { ExchageRateTable } from './ExchangeRateTable';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />} initialRouteName={"Converter"}>
        <Tab.Screen name="Currency Converter" options={{
          tabBarIcon: ({focused, color}) => { return <ArrowLeftRight color={color} style={{marginBottom: 3}}/> }, 
          tabBarLabel: "Convert", 
          headerShown: false,
          headerTintColor: '#000'}}
          component={Converter} 
          key="converter" />
        <Tab.Screen name="Exchange Table" options={{
          tabBarIcon: ({focused, color}) => { return <Table fill={color} style={{marginBottom: 3}}/> }, 
          tabBarLabel: "Table", 
          headerTintColor: '#000',
          headerShown: false,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 30, paddingTop: 20 }}} 
          component={ExchageRateTable} 
          key="table" />
        <Tab.Screen name="Graph" options={{
          tabBarIcon: ({focused, color}) => { return <GraphUp fill={color} style={{marginBottom: 3}} /> },
          tabBarBadge: 3,
          tabBarLabel: "History", 
          headerTintColor: '#000',
          headerShown: false,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 30, paddingTop: 20 }}} 
          component={RateHistory} 
          key="graph" />
      </Tab.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
    
}