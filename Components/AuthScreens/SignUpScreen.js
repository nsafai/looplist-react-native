import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import { Button as StyledButton } from 'react-native-elements';
import { postData, HOST_URL } from '../helpers/Requests';
import styles from './styles/FormStyles';
import CustomText from '../CustomText';
import { placeholder } from '../helpers/Colors';
 
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
      <ScrollView 
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.wrapper}
      >
        <CustomText style={styles.appTitle}>looplist</CustomText>
        <View style={styles.loginForm}>
          <TextInput
            onChangeText={(text) => this.onChangeText(text, 'name')}
            value={this.state.name}
            placeholder={this.state.placeholderName}
            placeholderTextColor={placeholder}
            style={styles.inputField}
            autoCapitalize = 'words'
          />
          <TextInput
            onChangeText={(text) => this.onChangeText(text, 'email')}
            value={this.state.email}
            placeholder={this.state.placeholderEmail}
            placeholderTextColor={placeholder}
            style={styles.inputField}
            autoCapitalize = 'none'
            keyboardType='email-address'
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
          title="Sign up" 
          onPress={this.pingServer}
          buttonStyle={styles.ctaBtn}
        />
        <View style={styles.otherOption}>
          <CustomText style={styles.otherOptionText}>Already have an account?</CustomText>
          <CustomText 
            onPress={this.signIn}
            style={styles.otherBtn}
          >
            Login
          </CustomText>
        </View>
      </ScrollView>
    );
  }

  signIn = () => {
    this.props.navigation.navigate('SignIn');
  }

  showError = (text) => {
    let errors = [
      <CustomText style={styles.helperText} key={'credentials'}>
        {text}
      </CustomText> 
    ];
    this.setState({
      showHelperText: true,
      errors
    })
  }

  pingServer = () => {
    const { name, email, password } = this.state;
    const url = HOST_URL + '/signup';

    postData(url, { name, email, password })
      .then(res => {
        if(res.status >= 200 && res.status < 300) {
          return res.json();
        }  else {
          throw new Error("Server can't be reached!");
        }
      })
      .then(json => {
        if (json) {
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
            this.setState({
              showHelperText: true,
              errors
            })
          }

          else if (json.user) {
            AsyncStorage.setItem('userId', json.user);
            AsyncStorage.setItem('sessionExpires', json.expires)
            this.props.navigation.navigate('App');
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.showError(`Can\'t reach server. ${err.message}.`);
      })
  }
}

export default SignUpScreen;
