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

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  state = { 
    email: '',
    password: '',
    placeholderEmail: 'Email address',
    placeholderPassword: 'Enter your password',
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
          title="Sign in" 
          onPress={this.pingServer} 
        />
        <View style={styles.otherOption}>
          <Text style={styles.text}>Don't have an account?</Text>
          <Button 
            title="Signup" 
            onPress={this.signUp}
          />
        </View>
      </View>
    );
  }

  signUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  pingServer = () => {
    const { email, password } = this.state;
    const url = `https://loop-list.herokuapp.com/login`;

    postData(url, { email, password })
      .then(res => res.json())
      .then(json => {
        console.log(json.cookie.expires)
        AsyncStorage.setItem('userToken', json.cookie.expires);
        this.props.navigation.navigate('App');
      })
      .catch(err => console.log(err.message))
  }
}

export default SignInScreen;

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
