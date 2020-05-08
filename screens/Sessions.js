import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dbManager from '../Source/db-manager';

class SessionsActivity extends React.Component {
  static navigationOptions = {
    title: 'Sessions',
    headerStyle: {
      backgroundColor: '#73C6B6',
    },
  };

  renderItem(item) {
    return (
      <TouchableHighlight onPress={() => this.test(item)}>
        <View style={[styles.row, {backgroundColor: 'red'}]}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: '#333333',
              padding: 10,
            }}>
            {item}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={dbManager.getAllSession().reverse()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPressIn={() => (global.sessionsKey = item)}
              onPressOut={() => this.props.navigation.navigate('Map')}
              style={styles.item}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default SessionsActivity;
