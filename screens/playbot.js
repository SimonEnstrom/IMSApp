import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import dbHandler from '../Source/backend-handler'
class PlaybotActivity extends React.Component {
    static navigationOptions = {
    title: "playbot",
    headerStyle: {
    backgroundColor: "#73C6B6"
    }
};
render() {
    return (
    <View style={styles.container}>
    <Text style={styles.headerText}> Go Back </Text>
    <Button
        title="Go Back"
        onPress={() => this.props.navigation.goBack()}
    />
    <Text style={styles.headerText}> Run Backend </Text>
    <Button
        title="Run Backend"
        onPress={() => createBotMessage()}
    />
    </View>
    );}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    }
});
function createBotMessage(){
    const stx = 2
    let posX = 27
    let posY = 93
    let col = 1
    let colX = 222
    let colY = 23
    const etx = 3
    let message = ""+stx+""+posX+""+posY+""+col+""+colX+""+colY+""+etx
    console.log("Message: ", message)
}

export default PlaybotActivity;