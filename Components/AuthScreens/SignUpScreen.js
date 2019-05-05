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
 
class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Create an Account',
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
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}
            placeholder={this.state.placeholderName}
            style={styles.inputField}
          />
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
          title="Sign up" 
          onPress={this.pingServer}
          buttonStyle={styles.ctaBtn}
        />
        <View style={styles.otherOption}>
          <Text style={styles.text}>Already have an account?</Text>
          <Button 
            title="Login" 
            onPress={this.signIn}
            type="clear"
            buttonStyle={styles.otherBtn}
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
