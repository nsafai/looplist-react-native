import React from 'react';
import {
  AsyncStorage,
  View,
  Button,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import { Button as StyledButton } from 'react-native-elements';
import { postData } from '../helpers/Requests';
import styles from './styles/FormStyles';
import { placeholder } from '../helpers/Colors';
import CustomText from '../CustomText';
import { HOST_URL } from 'react-native-dotenv';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign In',
  };

  state = { 
    email: '',
    password: '',
    placeholderEmail: 'Email address',
    placeholderPassword: 'Enter your password',
    errors: [],
    showHelperText: false,
  };

  renderHelperText() {
    const { showHelperText, errors } = this.state;
    if (showHelperText == true) {
      if (errors.length > 0) {
        return errors;
      }
      return (
      <CustomText style={styles.helperText} key={'generic-err'}>
        Please fill out all fields.
      </CustomText>
      )
    }
  }

  render() {
    return (
      <ScrollView 
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.wrapper}
      >
        <CustomText style={styles.appTitle}>looplist</CustomText>
        <View style={styles.loginForm}>
          <TextInput
            onChangeText={(text) => this.onChangeText(text, 'email')}
            value={this.state.email}
            placeholder={this.state.placeholderEmail}
            placeholderTextColor={placeholder}
            style={styles.inputField}
            autoCapitalize = 'none'
          />
          <TextInput
            onChangeText={(text) => this.onChangeText(text, 'password')}
            value={this.state.password}
            placeholder={this.state.placeholderPassword}
            placeholderTextColor={placeholder}
            secureTextEntry={true}
            style={styles.inputField}
            autoCapitalize = 'none'
          />
        </View>
        {this.renderHelperText()}
        <StyledButton 
          title="Sign in" 
          onPress={this.pingServer} 
          buttonStyle={styles.ctaBtn}
        />
        <View style={styles.otherOption}>
          <CustomText style={styles.otherOptionText}>Don't have an account?</CustomText>
          <CustomText 
            onPress={this.signUp}
            style={styles.otherBtn}
          >
            Signup
          </CustomText>
        </View>
      </ScrollView>
    );
  }

  onChangeText(text, fieldName) {
    this.setState({
      [fieldName]: text,
      showHelperText: false,
    })
  }

  signUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  pingServer = () => {
    const { email, password } = this.state;
    const url = `${HOST_URL}/login`;

    postData(url, { email, password })
      .then(res => res.json())
      .then(json => {
        if (json) {
          if (json.status == 401) {
            let errors = [
              <CustomText style={styles.helperText} key={'credentials'}>
                Email and/or password are incorrect
              </CustomText> 
            ];
            this.setState({
              showHelperText: true,
              errors
            })
          }

          else if (json.user) {
            AsyncStorage.setItem('userToken', json.user);
            AsyncStorage.setItem('sessionExpires', json.expires)
            this.props.navigation.navigate('App');
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export default SignInScreen;
