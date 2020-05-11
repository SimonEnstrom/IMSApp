import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Svg, {Polyline} from 'react-native-svg';

import dbManager from '../Source/db-manager';

class MapActivity extends React.Component {
  static navigationOptions = {
    title: 'Map',
    headerStyle: {
      backgroundColor: '#73C6B6',
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}> Go Back </Text>
        <View style={[StyleSheet.absoluteFill, styles.svgContainer]}>
          <Button
            title="Go Back"
            onPress={() => this.props.navigation.goBack()}
          />
          <Button
            title="Sessions"
            onPress={() => this.props.navigation.navigate('Sessions')}
          />
          <Button
            title="Import path"
            onPress={() => {
              getPath(global.sessionsKey), this.forceUpdate();
            }}
          />
          <Svg height="80%" width="90%" viewBox="0 0 254 254">
            <Polyline
              points={getPath(global.sessionsKey)}
              fill="none"
              stroke="black"
              strokeWidth="3"
            />
          </Svg>
        </View>
      </View>
    );
  }
}

function getPath(key) {
  var arr;
  if (key) {
    arr = dbManager.getOtherSession(key);
  } else {
    arr = dbManager.getLastSessionPath();
  }
  let index = arr.length - 1;
  if (index < 0) {
    index = 0;
  }
  try {
    let xCord;
    let yCord;
    let colArr = [];
    let path = '';

    for (let i = 0; i < index; i++) {
      let point = '';
      xCord = arr[i].x;
      yCord = arr[i].y;
      point = xCord + ',' + yCord + ' ';
      colArr.push(arr[i].didCollide);
      path += point;
    }
    console.log('path: ', path);
    return path;
  } catch (error) {
    console.log('Error creating path: ', error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MapActivity;
