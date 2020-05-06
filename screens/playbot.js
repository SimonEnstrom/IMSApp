import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import dbHandler from '../Source/backend-handler';
import dbManager from '../Source/db-manager';
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
        <Text style={styles.headerText}> Run Tester function </Text>
        <Button title="Run tester" onPress={() => tester()} />
        <Text style={styles.headerText}>
          Push 12 rand coords to new session
        </Text>
        <Button
          title="Send random cords"
          onPress={() => sendRandomPosToNewSession()}
        />
        <Text style={styles.headerText}>
          Push 12 rand coords to last session
        </Text>
        <Button
          title="Send random cords"
          onPress={() => sendRandomPosToOldSession()}
        />
      </View>
    );
  }
}

function tester() {
  //dbHandler.continueSession();
  dbManager.tester();
}

function sendRandomPosToNewSession() {
  const loopVar = 12;
  let index = 0;
  dbManager.startNewSession();
  while (index < loopVar) {
    let xCord = Math.floor(Math.random() * 254);
    let yCord = Math.floor(Math.random() * 254);
    let didCollide = false;
    if (xCord < 63) {
      xCord = 0;
    } else if (xCord < 127) {
      xCord = 254;
    } else if (xCord < 190) {
      yCord = 0;
    } else if (xCord < 255) {
      yCord = 254;
    }
    dbManager.pushToNewSession(xCord, yCord, didCollide);
    index++;
  }
}
function sendRandomPosToOldSession() {
  const loopVar = 12;
  let index = 0;

  while (index < loopVar) {
    let xCord = Math.floor(Math.random() * 254);
    let yCord = Math.floor(Math.random() * 254);
    let didCollide = false;
    if (xCord < 63) {
      xCord = 0;
    } else if (xCord < 127) {
      xCord = 254;
    } else if (xCord < 190) {
      yCord = 0;
    } else if (xCord < 255) {
      yCord = 254;
    }
    dbManager.pushToNewSession(xCord, yCord, didCollide);
    index++;
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

export default PlaybotActivity;
