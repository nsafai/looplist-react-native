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
  static navigationOptions = {
    title: 'Please sign up',
  };

  state = { 
    name: '',
    email: '',
    password: '',
    placeholderName: 'Full Name (ex: Jade Smith)',
    placeholderEmail: 'Email address',
    placeholderPassword: 'Choose a password...',
  };

  render() {
    return (
      <View>
        <View style={styles.loginForm}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}
            placeholder={this.state.placeholderName}
          />
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
          onPress={this.pingServer} 
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

  pingServer = () => {
    const { name, email, password } = this.state;
    const url = `https://loop-list.herokuapp.com/signup`;

    postData(url, { name, email, password })
      .then(res => res.json())
      .then(json => {
        console.log(json.cookie.expires)
        AsyncStorage.setItem('userToken', json.cookie.expires);
        this.props.navigation.navigate('App');
      })
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