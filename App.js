import { 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from 'react-navigation';
import HomeScreen from './Components/AppScreens/HomeScreen';
import AboutScreen from './Components/AppScreens/AboutScreen';
import AuthLoadingScreen from './Components/AuthScreens/AuthLoadingScreen';
import SignInScreen from './Components/AuthScreens/SignInScreen';
import SignUpScreen from './Components/AuthScreens/SignUpScreen';
import DetailScreen from './Components/AppScreens/ListDetailScreen';


const AppStack = createStackNavigator({ 
  Home: HomeScreen, 
  About: AboutScreen,
  Detail: DetailScreen
},
{
  headerMode: 'screen',
  cardStyle: { backgroundColor: '#f1f2f6' },
});
const AuthStack = createStackNavigator({ 
  SignUp: SignUpScreen, 
  SignIn: SignInScreen 
},
{
  headerMode: 'screen',
  cardStyle: { backgroundColor: '#f1f2f6' },
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
