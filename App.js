import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeActivity from './screens/Home';
import ConnectedActivity from './screens/Connected';
import ManualDriveActivity from './screens/ManualDrive';
import DataActivity from './screens/Data';
import MapActivity from './screens/Map';
import BluetoothActivity from './screens/Bluetooth';
global.direction = 0;
global.autonomous = 0;
global.mode = 1;
const RootStack = createStackNavigator({
  Home: { screen: HomeActivity },
  Connected: { screen: ConnectedActivity },
  ManualDrive: { screen: ManualDriveActivity },
  Data: { screen: DataActivity },
  Map: {  screen: MapActivity },
  Bluetooth: { screen: BluetoothActivity },
},
{
  initialRouteName: 'Home',
});
console.disableYellowBox = true;


  render() {
    const list = Array.from(this.state.peripherals.values());
    const btnScanTitle = 'Scan Bluetooth (' + (this.state.scanning ? 'on' : 'off') + ')';

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{margin: 10}}>
            <Button title={btnScanTitle} onPress={() => this.startScan() } />
          </View>

          <View style={{margin: 10}}>
            <Button title="Retrieve connected peripherals" onPress={() => this.retrieveConnected() } />
          </View>

          <ScrollView style={styles.scroll}>
            {(list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No peripherals</Text>
              </View>
            }
            <FlatList
              data={list}
              renderItem={({ item }) => this.renderItem(item) }
              keyExtractor={item => item.id}
            />

          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
});