import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';
import AuthLoadingScreen from './AuthLoadingScreen';

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
class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const AppStack = createStackNavigator({ Home: HomeScreen, About: AboutScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

const styles = StyleSheet.create({
  home: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settings: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
