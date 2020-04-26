import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BackgroundTask from 'react-native-background-task';


BackgroundTask.define(async () => {
    console.log('Hello from a background task');
    BackgroundTask.finish();
  });

class ManualDriveActivity extends React.Component {
    static navigationOptions = {
        title: "ManualDrive",
        headerStyle: {
            backgroundColor: "#73C6B6"
        }
    };
    
    constructor(){
        super();
        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleLeft = this.handleLeft.bind(this);
        this.handleRight = this.handleRight.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        
        this.direction = 0;
    }

    componentDidMount() {
        BackgroundTask.schedule()
      }

    handleUp() {
        this.direction = 1;
        console.log("up");
    }
    
    handleLeft() {
        this.direction = 2;
        console.log("left");
    }
    handleRight() {
        this.direction = 3;
        console.log("right");
    }
    handleDown() {
        this.direction = 4;
        console.log("down");
    }
    handleRelease() {
        this.direction = 0;
        console.log("release");
    }

render() {
    return (
    <View style={styles.buttonContainer}>
        <Text style={styles.headerText}>Manual Drive Buttons k</Text>
        {/* Up */}
        <View style={styles.manUp}>
        <TouchableOpacity onPressIn={this.handleUp} onPressOut={this.handleRelease}>
                <Image source={require('../img/ManButton.png')} />
            </TouchableOpacity>
        </View>
        {/* Left */}
        <View style={styles.middleRow}>
            <View style={styles.manLeft}>
                <TouchableOpacity onPressIn={this.handleLeft} onPressOut={this.handleRelease}>
                    <Image source={require('../img/ManButton.png')} />
                </TouchableOpacity>
            </View>
            {/* Middle */}
            <View style={styles.manMiddle}></View>
            {/* Right */}
            <View style={styles.manRight}>
                <TouchableOpacity onPressIn={this.handleRight} onPressOut={this.handleRelease}>
                    <Image source={require('../img/ManButton.png')} />
                </TouchableOpacity>
            </View>
        </View>

        {/* Down */}
        <View style={styles.manDown}>
            <TouchableOpacity onPressIn={this.handleDown} onPressOut={this.handleRelease}>
                <Image source={require('../img/ManButton.png')} />
            </TouchableOpacity>
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
        paddingTop: "35%",
        alignContent: "center",
        justifyContent: "center"
    },
    manDown: {
        flex: 3,
        transform: [{ rotate: '180 deg'}],
        paddingTop: "40%",
        alignContent: "center",
        justifyContent: "center"
    },
    manLeft: {
        flex: 2,
        flexDirection: "row",
        transform: [{ rotate: '270 deg'}],
        backgroundColor: "rgba(52, 52, 52, 0)",
        alignContent: "center",
        justifyContent: "center"
    },
    manRight: {
        flex: 2,
        flexDirection: "row",
        transform: [{ rotate: '90 deg'}],
        backgroundColor: "rgba(52, 52, 52, 0)",
        alignContent: "center",
        justifyContent: "center"
    },
    manMiddle: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgba(52, 52, 52, 0)",
        padding: 0,
        alignContent: "center",
        justifyContent: "center"
    },
    middleRow: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgba(52, 52, 52, 0)",
        alignContent: "center",
        justifyContent: "center"
    }
});
export default ManualDriveActivity;