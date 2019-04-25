import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

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

class HomeScreen extends React.Component {
  render() {

    return (
      <View style={styles.home}>
        <Ionicons name="ios-home" size={32} />
        <Text>Home!</Text>
        <Button title="Read More About Us" onPress={() => {this.props.navigation.navigate('About')}} />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {

    return (
      <View style={styles.settings}>
        <Ionicons name="ios-settings" size={32} />
        <Text>Settings!</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  About: { screen: AboutScreen }
})

// createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig)
const TabNavigator = createBottomTabNavigator(
  // Route Configs
  { 
    Home: HomeStack,
    Settings: SettingsScreen,
  }, 
  // BottomTabNavigatorConfig
  { 
    defaultNavigationOptions: ({ navigation}) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch(routeName) {
              case 'Home': 
                iconName = 'ios-home'
                break
              case 'Settings': 
                iconName = 'ios-settings'
            }
            return <Ionicons name={iconName} size={25} color={tintColor} />
        }
    }),
    tabBarOptions: {
      activeTintColor: '#df6f22',
      inactiveTintColor: '#d3d7da',
      activeBackgroundColor: '#d3d7da',
      inactiveBackgroundColor: '#576574'
    }
  }
);

export default createAppContainer(TabNavigator);

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
