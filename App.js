import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons'


class HomeScreen extends React.Component {
  render() {

    return (
      <View style={styles.home}>
        <Text>Home!</Text>
        <Ionicons name="ios-home" size={32} />
        {/* <Ionicons.Button name='ios-add-circle-outline' size={32} /> */}
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {

    return (
      <View style={styles.settings}>
        <Text>Settings!</Text>
        <Ionicons name="ios-settings" size={32} />
      </View>
    );
  }
}

// createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig)
const TabNavigator = createBottomTabNavigator(
  // Route Configs
  { 
    Home: HomeScreen,
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
