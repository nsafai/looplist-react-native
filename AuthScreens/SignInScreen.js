import React from 'react';
import {
  AsyncStorage,
  View,
  Button
} from 'react-native';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign in" onPress={this._signInAsync} />
        <Button title="Create an account" onPress={this.signUp} />
      </View>
    );
  }

  signUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

export default SignInScreen;