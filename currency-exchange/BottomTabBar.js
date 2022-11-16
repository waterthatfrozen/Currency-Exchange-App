import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './Stylesheet';

export function BottomTabBar (props){
    let state = props.state;
    let descriptors = props.descriptors;
    let navigation = props.navigation;
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key });
            if (!isFocused && !event.defaultPrevented) { navigation.navigate(route.name); } };
          const onLongPress = () => { navigation.emit({ type: 'tabLongPress', target: route.key, }); };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabButton, isFocused ? styles.tabButtonFocused : styles.tabButtonUnfocused]}
              key={index}>
              {options.tabBarIcon({focused: isFocused, color: isFocused ? '#FFF' : '#000'})}
              <Text style={isFocused ? styles.textFocused : styles.textUnfocused}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
}