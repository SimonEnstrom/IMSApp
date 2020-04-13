import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
class ManualDriveActivity extends React.Component {
    static navigationOptions = {
    title: "ManualDrive",
    headerStyle: {
    backgroundColor: "#73C6B6"
    }
};
render() {
    return (
    <View style={styles.buttonContainer}>
        <Text style={styles.headerText}>Manual Drive Buttons k</Text>
        <Image source={require('../img/ManButton.png')} 
        style={styles.manUp}/>
        <Image source={require('../img/ManButton.png')} 
        style={styles.manLeft}/>
        <Image source={require('../img/ManButton.png')} 
        style={styles.manRight}/>
        <Image source={require('../img/ManButton.png')} 
        style={styles.manDown}/>
    </View>
    );}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.0)"
    },
    buttonContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        width: '100%'
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    manUp: {
        width: '20%',
        height: '20%',
        margin: 0,
        padding: 0,
    },
    manDown: {
        width: '20%',
        height: '20%',
        transform: [{ rotate: '180 deg'}],
        margin: 0,
        padding: 0
    },
    manLeft: {
        width: '20%',
        height: '20%',
        transform: [{ rotate: '270 deg'}],
        margin: 0,
        padding: 0,
    },
    manRight: {
        width: '20%',
        height: '20%',
        transform: [{ rotate: '90 deg'}],
        margin: 0,
        padding: 0
    }
});
export default ManualDriveActivity;