import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import { Button } from 'react-native-elements';
import Todo from './Components/Todo';
import { HOST_URL } from 'react-native-dotenv';
import { green, grey } from '../helpers/Colors';
import SocketIOClient from 'socket.io-client';
import Icon from 'react-native-vector-icons/Ionicons';

class ListDetailScreen extends Component {
  navState = this.props.navigation.state;
  id = this.navState.params._id;
  title = this.navState.params.title;
  todoComponents = [];
  socket = SocketIOClient(HOST_URL); // create socket.client instance and auto-connect to server

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title || '',
    }
  }

  state = {
    currentListTodos: null,
  }

  componentDidMount() {
    console.log(this.props.navigation.state);
    this.getTodos();
  }
 
  getTodos() {
    this.socket.emit('get-list', this.id);
    this.socket.on('get-list', (res) => {
      const { currentListTodos } = res;
      if (currentListTodos) {
        this.setState({ currentListTodos });
      }
    });
  }

  toggleCheckBox = (todoId, completed) => {
    this.socket.emit('toggle-todo', [{
      id: todoId,
      completed
    }]);
    this.socket.on('toggle-todo', () => {
      let { currentListTodos } = this.state;
      currentListTodos.forEach((todo) => {
        if (todo._id === todoId) {
          todo.completed = !completed; 
        }
      });
      this.setState({ currentListTodos });
    })
  }

  resetTodos() {
    this.socket.emit('reset-all-todos', this.id);
    this.socket.on('reset-all-todos', () => {
      let { currentListTodos } = this.state;
      currentListTodos.forEach((todo) => {
        todo.completed = false;
      })
      this.setState({ currentListTodos });
    });
  }

  deleteList() {
    console.log("trying to delete list FOR REAL!");
    this.socket.emit('delete-list', this.id);
    // navigate back somehow
    this.props.navigation.goBack();
  }

  renderTodos() {
    const { currentListTodos } = this.state;
    if (currentListTodos === null) {
      return <ActivityIndicator size='large' />;
    } else {
      let todos = [];
      currentListTodos.forEach((todo) => {
        todos.push(
          <Todo 
            key={todo._id}
            todoId={todo._id}
            name={todo.name}
            completed={todo.completed}
            onPress={this.toggleCheckBox.bind(null, todo._id, todo.completed)}
          />
        );
      });
      if (todos.length === 0) {
        return <CustomText style={styles.helperText}>You don't have any todos yet, add them on www.looplist.xyz</CustomText>;
      } else if (todos.length > 0) {
        return todos;
      } 
    }
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleAndBtn}>
          <CustomText style={styles.title}>{this.title}</CustomText>
          <Button 
            title="Reset All" 
            onPress={() => this.resetTodos()}
            buttonStyle={styles.resetBtn}
          />
        </View>
        {this.renderTodos()}
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => this.deleteList(this.id)} width={100}>
            <View style={styles.deleteListBtn}>
              <CustomText style={styles.deleteTxt}>Delete List</CustomText>
              <Icon name="ios-trash" size={30} color={grey} style={styles.trashBtn} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default ListDetailScreen


const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    margin: 10,
  }, 
  titleAndBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 20,
  },
  resetBtn: {
    backgroundColor: green,
    width: 100,
    margin: 10,
  },
  helperText: {
    padding: 30,
  },
  btnContainer: {
    width: 110,
    height: 30,
    marginTop: 100,
    marginRight: 18,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  deleteListBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteTxt: {
    marginRight: 10,
    color: grey,
    fontSize: 12,
  },
})