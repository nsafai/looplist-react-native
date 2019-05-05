import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import { postData } from '../helpers/Requests';
import styles from './helpers/FormStyles';
import CustomText from '../CustomText';
import { HOST_URL } from 'react-native-dotenv';
 
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

  onChangeText(text, fieldName) {
    this.setState({
      [fieldName]: text,
      showHelperText: false,
    })
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <CustomText style={styles.appTitle}>looplist</CustomText>
        <View style={styles.loginForm}>
          <TextInput
            onChangeText={(text) => this.onChangeText(text, 'name')}
            value={this.state.name}
            placeholder={this.state.placeholderName}
            style={styles.inputField}
            autoCapitalize = 'words'
          />
          <TextInput
            onChangeText={(text) => this.onChangeText(text, 'email')}
            value={this.state.email}
            placeholder={this.state.placeholderEmail}
            style={styles.inputField}
            autoCapitalize = 'none'
          />
          <TextInput
            onChangeText={(text) => this.onChangeText(text, 'password')}
            value={this.state.password}
            placeholder={this.state.placeholderPassword}
            secureTextEntry={true}
            style={styles.inputField}
            autoCapitalize = 'none'
          />
        </View>
        {this.renderHelperText()}
        <Button 
          title="Sign up" 
          onPress={this.pingServer}
          buttonStyle={styles.ctaBtn}
        />
        <View style={styles.otherOption}>
          <CustomText style={styles.text}>Already have an account?</CustomText>
          <Button 
            title="Login" 
            onPress={this.signIn}
            type="outline"
            buttonStyle={styles.otherBtn}
          />
        </View>
      </ScrollView>
    );
  }

  signIn = () => {
    this.props.navigation.navigate('SignIn');
  }

  pingServer = () => {
    const { name, email, password } = this.state;
    const url = `${HOST_URL}/signup`;

    postData(url, { name, email, password })
      .then(res => res.json())
      .then(json => {
        if (json) {
          // console.log(json)
          if (json.errors) {
            let errors = [];
            for (key in json.errors) {
              let cleanErr = json.errors[key].message
                .replace('Path \`', '')
                .replace('\`', '')
                .replace('.', '');
              errors.push(
                <CustomText style={styles.helperText} key={cleanErr}>{cleanErr}</CustomText> 
              );
            }
            console.log(errors);
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
      .catch(err => console.log(err.message))
  }
}

export default SignUpScreen;
