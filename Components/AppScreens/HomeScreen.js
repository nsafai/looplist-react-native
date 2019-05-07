import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import CustomText from '../CustomText';
import { getData } from '../helpers/Requests';
import { HOST_URL } from 'react-native-dotenv';
import ListNameCell from './Components/ListNameCell';
import { green, lightGrey } from '../helpers/Colors';
import { Button } from 'react-native-elements';
import SocketIOClient from 'socket.io-client';

class HomeScreen extends React.Component {
  socket = SocketIOClient(HOST_URL); // create socket.client instance and auto-connect to server

  static navigationOptions = {
    title: 'My Lists',
  };

  state = {
    lists: null,
  }

  reFetch = this.props.navigation.addListener('willFocus', () => {
    this.getLists();
  });

  componentWillUnMount() {
    this.reFetch;
  }

  componentDidMount() {
    this.getLists();
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

  renderLists() {
    let { lists } = this.state;

    if (lists === null) {
      return <ActivityIndicator size='large' />;
    } else if (lists.length === 0) {
      return <CustomText style={styles.helperText}>You don't have any lists yet, add them on www.looplist.xyz</CustomText>;
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

  navigateDetail(item) {
    const { navigate } = this.props.navigation; // to navigate to DetailScreen
    navigate('Detail', item)
  }
  
  newList = async () => {
    const userId = await AsyncStorage.getItem('userId');
    this.socket.emit('new-list', userId);
    this.socket.on('new-list', (res) => {
      console.log(res);
      let { lists } = this.state;
      if (!lists.includes(res)) {
        const newList = res;
        lists.unshift(newList); // add newList to beginning of lists as it should be on top
        this.setState({ lists }); // update state to re-render lists
        // navigate to new list
        this.navigateDetail(newList);
      }
    });
  }

  render() {
    return (
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.wrapper}
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
        <CustomText style={styles.appTitle}>looplist</CustomText>
      </ScrollView>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'left',
  },
  titleAndBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 20,
  },
  listsContainer: {
    margin: 0,
    padding: 0,
    width: '100%',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  helperText: {
    padding: 30,
  },
  newListBtn: {
    backgroundColor: green,
    paddingVertical: 15,
  },
  logOut: {
    color: green,
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  appTitle: {
    marginTop: 100,
    marginBottom: 60,
    textAlign: 'center',
    fontSize: 24,
    color: lightGrey,
  }
});