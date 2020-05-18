import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
  NativeEventEmitter,
  AppState,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import BleManager from 'react-native-ble-manager';
import dbManager from '../Source/db-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class BluetoothActivity extends React.Component {
  static navigationOptions = {
    title: "Bluetooth",
    headerStyle: {
        backgroundColor: "#73C6B6"
    }
};

  constructor() {
    super();

    this.state = {
      scanning: false,
      peripherals: new Map(),
      appState: '',
    };

    this.handleDiscoveredPeripheral = this.handleDiscoveredPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    //When screen is fully loaded, add listeners
    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({
      showAlert: false,
    });

    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoveredPeripheral,
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );
    this.handlerDisconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectedPeripheral,
    );
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic,
    );
    
    //Bluetooth needs more permissions if on android and version is 23 or higher
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  }

  //Handles bringing the app to foreground
  handleAppStateChange(nextAppState) {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      BleManager.getConnectedPeripherals([]).then(peripheralsArray => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({
      appState: nextAppState,
    });
  }

  //Handles switching to another screen when you navigate backwards
  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  //Handles losing connection with a bluetooth unit
  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({
        peripherals,
      });
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  //Handles retrieval and transmission of data to the robot, and pushes data to the database on collisions and turning in manual
  handleUpdateValueForCharacteristic(data) {
    var released = true;
    setTimeout(() => {
      let peripherals = this.state.peripherals;
      let peripheral = peripherals.get(data.peripheral);
      var dataCharacteristic = '0000ffe3-0000-1000-8000-00805f9b34fb';

      
      BleManager.write(
        peripheral.id,
        '0000ffe1-0000-1000-8000-00805f9b34fb',
        dataCharacteristic,
        [
          1,
          global.mode,
          global.direction,
          global.xCoord,
          global.yCoord,
          global.collision,
        ],
        6,
      ).then(() => {
        //Pushes data to db on turning
        //Data.value equals the transmission protocol
        if(global.direction == 0 && global.mode == 0 && global.relese == true){
          dbManager.pushToNewSession(data.value[3], data.value[4], data.value[5]); 
          global.relese = false;
        } 
          setTimeout(() => {
            //Pushes data to db on collision
            if (data.value[5]) {
              dbManager.pushToNewSession(data.value[3], data.value[4], data. value[5]);  
            }
          }, 10000);
      });
      
    }, 900);
  }

  //Handles scan button in app when scan is complete
  handleStopScan() {
    this.setState({
      scanning: false,
    });
  }

  //Handles starting scan button in app
  startScan() {
    if (!this.state.scanning) {
      //this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then(results => {
        console.log('Scanning...');
        this.setState({
          scanning: true,
        });
      });
    }
  }

  //Retrieves connected devices and generates list
  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({
          peripherals,
        });
      }
    });
  }

  //Handles putting found peripheral in visible list, depending on if they have a name
  handleDiscoveredPeripheral(peripheral) {
    var peripherals = this.state.peripherals;
    if (peripheral.name) {
      peripherals.set(peripheral.id, peripheral);
    }
    this.setState({
      peripherals,
    });
  }

  //Handles connecting and disconnecting to bluetooth device on press
  handleConnectingToPeripheral(peripheral) {
    var dataCharacteristic = '0000ffe3-0000-1000-8000-00805f9b34fb';
    if (peripheral) {
      //Handles disconnecting to device
      if (peripheral.connected) {
        BleManager.write(
          peripheral.id,
          '0000ffe1-0000-1000-8000-00805f9b34fb',
          dataCharacteristic,
          [
            1,
            0,
            0,
            global.xCoord,
            global.yCoord,
            global.collision,
          ],
          6,
        ).then(() => {
        BleManager.disconnect(peripheral.id);
        });
      } else {
        //Handles connecting to device
        BleManager.connect(peripheral.id).then(() => {
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            this.setState({
              peripherals,
            });
          }
          //New session
          dbManager.startNewSession();
          dbManager.pushToNewSession(127, 127, 0);
          setTimeout(() => {
            BleManager.retrieveServices(peripheral.id).then(
              peripheralInfo => {
                var service = '0000ffe1-0000-1000-8000-00805f9b34fb';
                var characteristic = '0000ffe2-0000-1000-8000-00805f9b34fb';
                var dataCharacteristic = '0000ffe3-0000-1000-8000-00805f9b34fb';
                setTimeout(() => {
                  BleManager.startNotification(
                    peripheral.id,
                    service,
                    characteristic,
                  ).catch(error => {
                    console.log('Notification error', error);
                  });
                }, 200);
              },
            );
          }, 900);
        })
        .catch(error => {
          console.log('Connection error', error);
        });
      }
    }
  }
  
  //Renders each item in list of ble units
  renderItem(item) {
    const color = item.connected ? '#273a60' : 'white';
    const textColor = item.connected ? 'white' : 'black';
    return (
      
      <TouchableHighlight onPress={() => this.handleConnectingToPeripheral(item)}>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: textColor,
              padding: 10,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: textColor,
              padding: 2,
            }}>
            RSSI: {item.rssi}
          </Text>
          <Text
            style={{
              fontSize: 8,
              textAlign: 'center',
              color: textColor,
              padding: 2,
              paddingBottom: 20,
            }}>
            {item.id}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  //Renders screen
  render() {
    const list = Array.from(this.state.peripherals.values());
    const btnScanTitle =
      'Scan Bluetooth ' + (this.state.scanning ? '(scanning)' : '');
    return (
      <SafeAreaView style={styles.container}>
        {/* Buttons */}
        <View style={styles.container}>
          <View style={{margin: 10, width: "50%"}}>
            <Button color='#273a60' title={btnScanTitle} onPress={() => this.startScan()} />
          </View>
          <View style={{margin: 10, width: "50%"}}>
            <Button color='#273a60' title="Map" onPress={() => this.props.navigation.navigate('Map')} />
          </View>
          <View style={{margin: 10, width: "50%"}}>
            <Button color='#273a60' title="Drive" onPress={() => this.props.navigation.navigate('ManualDrive')} />
          </View>

          {/* List */}
          <ScrollView style={styles.scroll}>
            {list.length == 0 && (
              <View style={{flex: 1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No peripherals</Text>
              </View>
            )}
            <FlatList
              data={list}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: "100%"
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  scroll: {
    width: "100%",
    backgroundColor: "white"
  }
});
export default BluetoothActivity;
