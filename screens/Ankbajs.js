import React, {Component} from 'react';
import {
Platform,
StyleSheet,
Text,
View,
Button
} from 'react-native';


import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class AnkbajsActivity extends React.Component {
    static navigationOptions = {
    title: 'Ankbajs',
    headerStyle: {
    backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',
    },
    };


    // constructor() {
    //     super();

    //     this.state = {
    //         scanning: false,
    //         peripherals: new Map(),
    //         appState: ''
    //     };

    //     this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    //     this.handleStopScan = this.handleStopScan.bind(this);
    //     this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    //     this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    //     this.handleAppStateChange = this.handleAppStateChange.bind(this);
    // }


render() {
    return (
    <View style={styles.container}>
        <Text style={styles.headerText} >Go to Connected</Text>
        <Button
            title="Go home Connected"
            onPress={() => this.props.navigation.navigate('ManualDrive')}
        />
    </View>
    );}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
});
export default AnkbajsActivity;