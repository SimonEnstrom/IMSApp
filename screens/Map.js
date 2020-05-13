import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Svg, {Circle, Polyline, Defs, Marker} from 'react-native-svg';

import dbManager from '../Source/db-manager';
var collisions = '';
var path = '';
setPath('');

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
        <View style={[StyleSheet.absoluteFill, styles.svgContainer]}>
          <View style={{margin: 10, width: '50%'}}>
            <Button
              color="#273a60"
              title="Sessions"
              onPress={() => this.props.navigation.navigate('Sessions')}
            />
          </View>
          <View style={{margin: 10, width: '50%'}}>
            <Button
              color="#273a60"
              title="Import path"
              onPress={() => {
                setPath(global.sessionsKey), this.forceUpdate();
              }}
            />
          </View>
          <Svg height="80%" width="90%" viewBox="0 0 254 254">
            <Defs>
              <Marker
                id="dot"
                viewBox="0 0 10 10"
                refX="0"
                refY="0"
                markerWidth="2"
                markerHeight="2">
                <Circle cx="0" cy="0" r="5" fill="red" />
              </Marker>
            </Defs>

            <Polyline
              id="line"
              points={getPath()}
              fill="none"
              stroke="black"
              strokeWidth="3"
            />
            <Polyline
              id="collision"
              points={getCols()}
              fill="none"
              strokeWidth="3"
              marker="url(#dot)"
            />
          </Svg>
        </View>
      </View>
    );
  }
}

function setPath(key) {
  var arr;
  if (key) {
    arr = dbManager.getOtherSession(key);
  } else {
    arr = dbManager.getLastSessionPath();
  }
  try {
    let lPath = '';

    for (i in arr) {
      lPath += pointToString(arr[i]);
    }
    setCollisions(arr);
    path = lPath;
  } catch (error) {
    console.log('Error creating path: ', error);
  }
}
function pointToString(point) {
  var pString = point.x + ',' + point.y + ' ';
  return pString;
}
function setCollisions(arr) {
  collisions = '';
  for (p in arr) {
    if (arr[p].didCollide) {
      collisions += arr[p].x + ',' + arr[p].y + ' ';
    }
  }
}
function getPath() {
  if (path == '') setPath(global.sessionsKey);
  return path;
}
function getCols() {
  var outsideScreen = '-5, -5';
  collisions = collisions != '' ? collisions : outsideScreen;
  return collisions;
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
