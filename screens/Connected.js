import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
class ConnectActivity extends React.Component {
    static navigationOptions = {
    title: "Connected",
    headerStyle: {
    backgroundColor: "#73C6B6"
    }
};
render() {
    return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Go to map</Text>
    <Button
        title="map"
        onPress={() => this.props.navigation.navigate("Map")}
    />
    <Text style={styles.headerText}> manual drive </Text>
    <Button
        title="manual drive"
        onPress={() => this.props.navigation.navigate("ManualDrive")}
    />
    <Text style={styles.headerText}> Go to data </Text>
    <Button
        title="data"
        onPress={() => this.props.navigation.navigate("Data")}
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
export default ConnectActivity;