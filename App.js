import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, YellowBox} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import firebase from 'firebase';
import HomeActivity from './screens/Home';
import ConnectedActivity from './screens/Connected';
import ManualDriveActivity from './screens/ManualDrive';
import DataActivity from './screens/Data';
import MapActivity from './screens/Map';
import BluetoothActivity from './screens/Bluetooth';
import PlaybotActivity from './screens/playbot';
import SessionsActivity from './screens/Sessions';
global.direction = 0;
global.autonomous = 0;
global.mode = 1;
global.xCoord = 0;
global.Coord = 0;
global.collision = 0;
global.sessionsKey = null;
const RootStack = createStackNavigator(
  {
    Home: {screen: HomeActivity},
    Connected: {screen: ConnectedActivity},
    ManualDrive: {screen: ManualDriveActivity},
    Data: {screen: DataActivity},
    Map: {screen: MapActivity},
    Playbot: {screen: PlaybotActivity},
    Bluetooth: {screen: BluetoothActivity},
    Sessions: {screen: SessionsActivity},
  },
  {
    initialRouteName: 'Home',
  },
);
console.disableYellowBox = true;

const App = createAppContainer(RootStack);
export default App;
