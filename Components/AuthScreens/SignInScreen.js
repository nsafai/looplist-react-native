import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import postData from './helpers/Requests';
import styles from './helpers/FormStyles';
import CustomText from '../CustomText';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign In',
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
        <CustomText style={styles.appTitle}>looplist</CustomText>
        <View style={styles.loginForm}>
          <TextInput
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={this.state.placeholderEmail}
            style={styles.inputField}
          />
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            placeholder={this.state.placeholderPassword}
            secureTextEntry={true}
            style={styles.inputField}
          />
        </View>
        <Button 
          title="Sign in" 
          onPress={this.pingServer} 
          buttonStyle={styles.ctaBtn}
        />
        <View style={styles.otherOption}>
          <Text style={styles.text}>Don't have an account?</Text>
          <Button 
            title="Signup" 
            onPress={this.signUp}
            type="outline"
            buttonStyle={styles.otherBtn}
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
