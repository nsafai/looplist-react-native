import React from 'react';
import {
  AsyncStorage,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import postData from './helpers/Requests';

class SignUpScreen extends React.Component {
  state = { 
    email: '',
    placeholderEmail: 'Email address',
    placeholderPassword: 'Choose a password...',
  };

  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <View style={styles.loginForm}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={this.state.placeholderEmail}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            placeholder={this.state.placeholderPassword}
            secureTextEntry={true}
          />
        </View>
        <Button 
          title="Sign up" 
          onPress={this._signInAsync} 
        />
        <View style={styles.otherOption}>
          <Text style={styles.text}>Already have an account?</Text>
          <Button 
            title="Login" 
            onPress={this.signIn}
          />
        </View>
      </View>
    );
  }

  signIn = () => {
    this.props.navigation.navigate('SignIn');
  }

  _signInAsync = async () => {
    this.pingServer()
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
  

  pingServer() {
    const url = `http://10.0.1.2:8080/signup`
    const name = 'Nicolai Safai'
    const email = 'test@example3.com'
    const password = 'password'

    postData(url, {name, email, password})
    // After a connection is made the data is streamed as JSON
    .then(res => res.text())
    .then(text => console.log(text))
    .catch(err => console.log(err.message))
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
  loginForm: {
    fontSize: 16,
  },
  otherOption: {
    display: 'flex',
    justifyContent: 'center', 
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'grey',
  }
});