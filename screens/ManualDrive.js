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
        {/* Up */}
        <View style={styles.manUp}>
        <Image source={require('../img/ManButton.png')} />
        </View>
        {/* Left */}
        <View style={styles.middleRow}>
        <View style={styles.manLeft}>
        <Image source={require('../img/ManButton.png')} />
        </View>
        {/* Middle         */}
        <View style={styles.manMiddle}></View>
        {/* Right */}
        <View style={styles.manRight}>
        <Image source={require('../img/ManButton.png')}/>
        </View>
        </View>

        {/* Down */}
        <View style={styles.manDown}>
        <Image source={require('../img/ManButton.png')} />
        </View>
    </View>
    );}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0)"
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
        flex: 3,
        paddingTop: "30%"
    },
    manDown: {
        flex: 3,
        transform: [{ rotate: '180 deg'}],
        paddingTop: "40%"
    },
    manLeft: {
        flex: 2,
        flexDirection: "row",
        transform: [{ rotate: '270 deg'}],
        backgroundColor: "rgba(52, 52, 52, 0)"
    },
    manRight: {
        flex: 2,
        flexDirection: "row",
        transform: [{ rotate: '90 deg'}],
        backgroundColor: "rgba(52, 52, 52, 0)"
    },
    manMiddle: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgba(52, 52, 52, 0)"
    },
    middleRow: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgba(52, 52, 52, 0)"
    }
});
export default ManualDriveActivity;