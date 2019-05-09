import { 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from 'react-navigation';
import HomeScreen from './Components/AppScreens/HomeScreen';
import AuthLoadingScreen from './Components/AuthScreens/AuthLoadingScreen';
import SignInScreen from './Components/AuthScreens/SignInScreen';
import SignUpScreen from './Components/AuthScreens/SignUpScreen';
import DetailScreen from './Components/AppScreens/ListDetailScreen';
import { bgColor } from './Components/helpers/Colors';

// the stack you'd see if you were logged in
const AppStack = createStackNavigator({ 
  Home: HomeScreen, 
  Detail: DetailScreen,
},
{
  headerMode: 'screen',
  cardStyle: { backgroundColor: bgColor },
});

// the stack you'd see if you're logged out
const AuthStack = createStackNavigator({ 
  SignUp: SignUpScreen, 
  SignIn: SignInScreen 
},
{
  headerMode: 'screen',
  cardStyle: { backgroundColor: bgColor },
});

// the switch stack which determines if logged in, the shows one of above
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
