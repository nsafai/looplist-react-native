import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

class AboutScreen extends React.Component {
  render() {

    return (
      <View style={styles.home}>
        <Ionicons name="ios-journal" size={32} />
        <Text>Read more about the company on this page.</Text>
      </View>
    );
  }
}

export default AboutScreen;

const styles = StyleSheet.create({
  home: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});