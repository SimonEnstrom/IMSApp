import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
class MapActivity extends React.Component {
    static navigationOptions = {
    title: "Map",
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
export default MapActivity;