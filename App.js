import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeActivity from './screens/Home';
import ConnectedActivity from './screens/Connected';
import ManualDriveActivity from './screens/ManualDrive';
import DataActivity from './screens/Data';
import MapActivity from './screens/Map';
const RootStack = createStackNavigator({
  Home: { screen: HomeActivity },
  Connected: { screen: ConnectedActivity },
  ManualDrive: { screen: ManualDriveActivity },
  Data: { screen: DataActivity },
  Map: {  screen: MapActivity },
  },
  {
    initialRouteName: 'Home',
  }
);

const App = createAppContainer(RootStack);
export default App;

//react-native run-android