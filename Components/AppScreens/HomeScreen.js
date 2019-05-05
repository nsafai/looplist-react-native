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
    this.getLists();
  }

  getLists = () => {
    const url = `${HOST_URL}/lists`;
    getData(url)
      .then(res => res.json())
      .then(json => {
        jsonLists = json.lists;
        lists = jsonLists.map(list => { return { id:list._id, title: list.title, todos: list.todoItems } });
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
              list={item}
              style={styles.listNameCell}
            />
          )}
          keyExtractor={(item, index) => `${index}-${item}`}
          className={styles.listsContainer}
        />
        <Button 
          title="Logout"
          style={styles.logOut}
          onPress={this._signOutAsync}
        />
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
    display: 'flex',
    margin: 0,
    flex: 1,
  },
  listsContainer: {
    display: 'flex',
    margin: 0,
    flex: 1,
  },
  logOut: {
    marginTop: 30,
  }
});