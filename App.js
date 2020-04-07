import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeActivity from './screens/Home';
import ConnectedActivity from './screens/Connected';
const RootStack = createStackNavigator({
  Home: { screen: HomeActivity },
  Connected: { screen: ConnectedActivity },
  },
  {
    initialRouteName: 'Home',
  }
);

const App = createAppContainer(RootStack);
export default App;


//react-native run-android