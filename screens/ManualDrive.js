import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


class ManualDriveActivity extends React.Component {
    static navigationOptions = {
        title: "Drive",
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
        this.toggleMode = this.toggleMode.bind(this);
    }

    //Up button pressed
    handleUp() {
        global.direction = 1;
    }

    //Down button pressed
    handleDown() {
        global.direction = 2;
    }

    //Left button pressed
    handleLeft() {
        global.direction = 4;
    }
    
    //Right button pressed
    handleRight() {
        global.direction = 3;
    }

    //Button released
    handleRelease() {
        global.direction = 0;
        global.relese = true;
    }

    //Toggle manual drive button pressed
    toggleMode() {
        console.log(global.mode);
        if(global.mode == 1) {
            global.mode = 0;
        }else {global.mode = 1;}
    }

    //Renders screen
    render() {
    return (
    <View style={styles.buttonContainer}>
        {/* Manual Drive button */}
        <View style={{margin: 10, width: "50%"}} >
        <Button color='#273a60' title={"turn " +  (global.mode ? 'on ' : 'off ') + "manual mode"} onPress={() => {this.toggleMode(), this.forceUpdate()}} />
        </View>
        
        {/* Up button */}
        <View style={styles.manUp}>
        <TouchableOpacity onPressIn={this.handleUp} onPressOut={this.handleRelease}>
                <Image source={require('../img/ManButton.png')} />
            </TouchableOpacity>
        </View>
        {/* Left button */}
        <View style={styles.middleRow}>
            <View style={styles.manLeft}>
                <TouchableOpacity onPressIn={this.handleLeft} onPressOut={this.handleRelease}>
                    <Image source={require('../img/ManButton.png')} />
                </TouchableOpacity>
            </View>
            {/* Middle blank */}
            <View style={styles.manMiddle}></View>
            {/* Right button */}
            <View style={styles.manRight}>
                <TouchableOpacity onPressIn={this.handleRight} onPressOut={this.handleRelease}>
                    <Image source={require('../img/ManButton.png')} />
                </TouchableOpacity>
            </View>
        </View>

        {/* Down button */}
        <View style={styles.manDown}>
            <TouchableOpacity onPressIn={this.handleDown} onPressOut={this.handleRelease}>
                <Image source={require('../img/ManButton.png')} />
            </TouchableOpacity>
        </View>
    </View>
    );}
}

//Styling
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