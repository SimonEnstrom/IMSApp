import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import dbHandler from '../Source/backend-handler';
class PlaybotActivity extends React.Component {
  static navigationOptions = {
    title: 'playbot',
    headerStyle: {
      backgroundColor: '#73C6B6',
    },
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
        <Button title="Send data" onPress={() => createBotMessage()} />
        <Text style={styles.headerText}> Run Backend </Text>
        <Button title="Retrive Data" onPress={() => retriveData()} />
        <Text style={styles.headerText}> Push random coordinates </Text>
        <Button title="Send random cords" onPress={() => sendRandomPos()} />
      </View>
    );
  }
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
    fontWeight: 'bold',
  },
});
function createBotMessage() {
  const stx = 2;
  let unit = 0;
  let driveMode = 0;
  let command = 0;
  let posX = 157;
  let posY = 157;
  let col = 1;
  const etx = 3;
  let message =
    '' +
    stx +
    '' +
    unit +
    '' +
    driveMode +
    '' +
    command +
    '' +
    posX +
    '' +
    posY +
    '' +
    col +
    '' +
    etx;
  console.log('Message sent from bot: ', message);
  dbHandler.handleMessage(message);
}

function retriveData() {
  let arr = dbHandler.retriveData();
  console.log('arr');
  console.log(arr[1].location);
}

function sendRandomPos() {
  let xCord = Math.floor(Math.random() * 254);
  let yCord = Math.floor(Math.random() * 254);
  let didCollide = false;

  dbHandler.pushNewPosition(xCord, yCord, didCollide);
}

export default PlaybotActivity;
