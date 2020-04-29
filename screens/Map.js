import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import dbHandler from '../Source/backend-handler';

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
          <Button title="Import path" onPress={() => getPath()} />
          <Svg height="80%" width="90%" viewBox="0 0 254 254">
            <Polyline
              points={getPath()}
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
function getPath() {
  console.log('Importing path');
  const arr = dbHandler.retriveData();
  const sessionIndex = 3;
  const positionArr = arr[sessionIndex].location;
  let xCord;
  let yCord;
  let colArr = [];
  let path = '';

  for (let i = 0; i < positionArr.length; i++) {
    let partialString = '';
    xCord = positionArr[i].xValue;
    yCord = positionArr[i].yValue;

    partialString = xCord + ',' + yCord + ' ';

    colArr.push(positionArr[i].didCollide);

    path += partialString;
  }
  console.log('path: ', path);
  return path;
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
