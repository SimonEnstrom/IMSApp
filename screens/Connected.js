import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
class ConnectActivity extends React.Component {
  static navigationOptions = {
    title: 'Connected',
    headerStyle: {
      backgroundColor: '#73C6B6',
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            title="map"
            onPress={() => this.props.navigation.navigate('Map')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="data"
            onPress={() => this.props.navigation.navigate('Data')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="bluetooth"
            onPress={() => this.props.navigation.navigate('Bluetooth')}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  button: {
    margin: '10%',
    width: '50%',
    backgroundColor: 'red',
  },
});
export default ConnectActivity;
