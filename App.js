import { 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from 'react-navigation';
import AuthLoadingScreen from './AuthLoadingScreen';
import HomeScreen from './AppScreens/HomeScreen';
import AboutScreen from './AppScreens/AboutScreen';
import SignInScreen from './AuthScreens/SignInScreen';
import SignUpScreen from './AuthScreens/SignUpScreen';


const AppStack = createStackNavigator({ 
  Home: HomeScreen, 
  About: AboutScreen 
});
const AuthStack = createStackNavigator({ 
  SignUp: SignUpScreen, 
  SignIn: SignInScreen 
});

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
