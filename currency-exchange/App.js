import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import currencyList from './currencyList.json';

import ArrowLeftRight from "react-native-bootstrap-icons/icons/arrow-left-right";
import Table from "react-native-bootstrap-icons/icons/table";
import GraphUp from "react-native-bootstrap-icons/icons/graph-up";

import { BottomTabBar } from './BottomTabBar.js';
import { CityScreen } from './CityScreen';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />} initialRouteName={"Converter"}>
        <Tab.Screen name="Currency Converter" options={{
          tabBarIcon: ({focused, color}) => {
            return <ArrowLeftRight color={color} style={{marginBottom: 3}}/>
          }, 
          tabBarLabel: "Convert", 
          headerShown: false,
          headerTintColor: '#000'}}
          component={CityScreen} 
          key="converter" />
        <Tab.Screen name="Exchange Table" options={{
          tabBarIcon: ({focused, color}) => {
            return <Table fill={color} style={{marginBottom: 3}}/>
          }, 
          tabBarLabel: "Table", 
          headerTintColor: '#000',
          headerShown: false,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 30, paddingTop: 20 }}} 
          component={CityScreen} 
          key="table" />
        <Tab.Screen name="Graph" options={{
          tabBarIcon: ({focused, color}) => {
            return <GraphUp fill={color} style={{marginBottom: 3}} />
          },
          tabBarBadge: 3,
          tabBarLabel: "Graph", 
          headerTintColor: '#000',
          headerShown: false,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 30, paddingTop: 20 }}} 
          component={CityScreen} 
        key="graph" />
      </Tab.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
