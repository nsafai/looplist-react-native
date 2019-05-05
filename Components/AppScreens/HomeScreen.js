import React from 'react';
import {
  AsyncStorage,
  View,
  ScrollView,
  Button,
  StyleSheet,
  FlatList
} from 'react-native';
import { getData } from '../helpers/Requests';
import { HOST_URL } from 'react-native-dotenv';
import ListNameCell from './Components/ListNameCell';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Lists',
  };

  state = {
    lists: [],
  }

  componentDidMount() {
    this.getLists()
  }

  getLists = (name) => {
    const url = `${HOST_URL}/lists`;
    getData(url)
      .then(res => res.json())
      .then(json => {
        jsonLists = json.lists;
        lists = jsonLists.map(list => list.title);
        this.setState({ lists });
      })
      .catch(err => console.log(err.message))
  }

  render() {
    // You'll need this to navigate to DetailScreen
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={styles.container}>
        <FlatList 
          style={styles.list}
          data={this.state.lists}
          renderItem={({item}) => (
            <ListNameCell 
              onPress={() => navigate('Detail', item)} 
              item={item} 
            />
          )}
          keyExtractor={(item, index) => `${index}-${item}`}
        />
        <Button title="Logout" onPress={this._signOutAsync} />
      </ScrollView>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('About');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  list: {
    // flex: 1,
    // width: '100%'
  },
  cell: {
    // width: '100%'
  },
  separator: {
    // 
  },
  segmentedControl: {
    // width: 150,
    // margin: 10
  }
});