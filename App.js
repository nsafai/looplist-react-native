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

const AppStack = createStackNavigator({ 
  Home: HomeScreen, 
  Detail: DetailScreen,
},
{
  headerMode: 'screen',
  cardStyle: { backgroundColor: bgColor },
});
const AuthStack = createStackNavigator({ 
  SignUp: SignUpScreen, 
  SignIn: SignInScreen 
},
{
  headerMode: 'screen',
  cardStyle: { backgroundColor: bgColor },
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
