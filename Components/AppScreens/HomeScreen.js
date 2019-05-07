import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CustomText from '../CustomText';
import { getData } from '../helpers/Requests';
import { HOST_URL } from 'react-native-dotenv';
import ListNameCell from './Components/ListNameCell';
import { green } from '../helpers/Colors';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'My Lists',
    headerTitleStyle: {
      fontFamily: 'Symbol'
    },
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
        console.log(res);
        if(res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          throw new Error("Server can't be reached!");
        }
      })
      .then(json => {
        jsonLists = json.lists;
        lists = jsonLists.map(list => { return { id:list._id, title: list.title, todos: list.todoItems } });
        this.setState({ lists });
      })
      .catch(err => console.log(err.message))
  }

  renderLists() {
    const { lists } = this.state;
    const { navigate } = this.props.navigation; // to navigate to DetailScreen

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
              onPress={() => navigate('Detail', item)} 
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
      >
        <CustomText style={styles.title}>My Lists</CustomText>
        {this.renderLists()}
        <CustomText 
          style={styles.logOut}
          onPress={this._signOutAsync}
        >
          Logout
        </CustomText>
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
    // alignItems: 'center',
    // alignSelf: 'stretch',
    // textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 30,
    textAlign: 'left',
  },
  listsContainer: {
    margin: 0,
    padding: 0,
    width: '100%',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  logOut: {
    marginTop: 30,
    color: green,
    fontSize: 16,
    textAlign: 'center',
  },
  helperText: {
    padding: 30,
  }
});