import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import CustomText from '../CustomText';
import { getData, HOST_URL } from '../helpers/Requests';
import { Button } from 'react-native-elements';
import ListNameCell from './Components/ListNameCell';
import SocketIOClient from 'socket.io-client';
import move from 'lodash-move';
import { findIndex } from 'lodash';
import styles from './Styles/HomeScreenStyles';

class HomeScreen extends React.Component {
  socket = SocketIOClient(HOST_URL); // create socket.client instance and auto-connect to server

  static navigationOptions = {
    title: 'My Lists',
  };

  state = {
    lists: null,
  }

  reFetch = this.props.navigation.addListener('willFocus', () => {
    this.getLists(); // just in case something has changed on another device
    this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true }); // scroll to top
  });

  componentDidMount() {
    this.getLists();
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  newList = async () => {
    const userId = await AsyncStorage.getItem('userId');
    this.socket.emit('new-list', userId);
    this.socket.on('new-list', (newList) => {
      let { lists } = this.state;
      if (!lists.includes(newList)) {
        lists.unshift(newList); // add newList to beginning of lists as it should be on top
        this.setState({ lists }); // update state to re-render lists
        this.navigateDetail(newList); // navigate to new list
      }
    });
  }

  getLists = () => {
    getData(HOST_URL + '/lists')
      .then(res => {
        if(res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          throw new Error("Server can't be reached!");
        }
      })
      .then(json => {
        lists = json.lists;
        this.setState({ lists });
      })
      .catch(err => console.log(err.message))
  }

  navigateDetail(item) {
    const { navigate } = this.props.navigation; // to navigate to DetailScreen
    navigate('Detail', item); // navigate to List Details
    let { lists } = this.state; 
    // get index of currentList from lists in state
    const listIndex = findIndex(lists, { _id: item._id });
    // move listname to top of list before navigating away
    const newLists = move(lists, listIndex, 0);
    // update current view before navigating away instead of on goBack()
    this.setState({ lists: newLists });
  }

  renderLists() {
    let { lists } = this.state;

    if (lists === null) {
      return <ActivityIndicator size='large' />;
    } else if (lists.length === 0) {
      return <CustomText style={styles.helperText}>You don't have any lists yet.</CustomText>;
    } else if (lists.length > 0) {
      return (
        <FlatList 
          style={styles.list}
          data={lists}
          renderItem={({item}) => (
            <ListNameCell 
              onPress={() => this.navigateDetail(item)}
              list={item}
              style={styles.listNameCell}
            />
          )}
          keyExtractor={(item, index) => `${index}-${item}`}
          className={styles.listsContainer}
        />
      )
    } 
  }

  render() {
    return (
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.wrapper}
        ref='_scrollView'
      >
        <View style={styles.titleAndBtn}>
          <CustomText style={styles.title}>My Lists</CustomText>
          <CustomText 
            style={styles.logOut}
            onPress={this._signOutAsync}
          >
            Logout
          </CustomText>
        </View>
        {this.renderLists()}
        <Button 
          title="New List" 
          onPress={() => this.newList()}
          buttonStyle={styles.newListBtn}
        />
        <CustomText style={styles.appTitle}>loop list</CustomText>
      </ScrollView>
    );
  }
}

export default HomeScreen;
