import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, YellowBox} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import firebase from 'firebase';

//Local file imports
import ManualDriveActivity from './screens/ManualDrive';
import MapActivity from './screens/Map';
import BluetoothActivity from './screens/Bluetooth';
import SessionsActivity from './screens/Sessions';

//Global variables to handle live updates between screens
global.direction = 0;
global.autonomous = 0;
global.mode = 1;
global.xCoord = 0;
global.yCoord = 0;
global.collision = 0;
global.sessionsKey = null;
global.relese = false;

//NavigationStack
const RootStack = createStackNavigator(
  {
    ManualDrive: {screen: ManualDriveActivity},
    Map: {screen: MapActivity},
    Bluetooth: {screen: BluetoothActivity},
    Sessions: {screen: SessionsActivity},
  },
  {
    initialRouteName: 'Bluetooth',
  },
);

//Disables light warnings in app
console.disableYellowBox = true;

const App = createAppContainer(RootStack);
export default App;
