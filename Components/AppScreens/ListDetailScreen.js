import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import { Button } from 'react-native-elements';
import Todo from './Components/Todo';
import { HOST_URL } from '../helpers/Requests';
import { green, grey } from '../helpers/Colors';
import SocketIOClient from 'socket.io-client';
import Icon from 'react-native-vector-icons/Ionicons';
import { findIndex } from 'lodash';

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

  toggleCheckBox = (id, currentCompletion) => {
    const completed = !currentCompletion; // if currently false, set to true & vice-versa
    this.socket.emit('toggle-todo', { todoId: id, completed });
    this.socket.on('toggle-todo', (updatedTodo) => {
      // Get array of todos from state, which we will update thereafter
      let { currentListTodos } = this.state;
      // Find index of updatedTodo in currentListTodos by the _id field
      const todoIndex = findIndex(currentListTodos, { _id: updatedTodo._id });
      // Replace item at index using native splice
      currentListTodos[todoIndex].completed = updatedTodo.completed;
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
    this.socket.emit('delete-list', this.id);
    this.props.navigation.goBack();
  }

  addTodo() {
    let { currentListTodos } = this.state;
    this.socket.emit('create-todo', { 
      currentListId: this.id, 
      todoIndex: currentListTodos.length, // add to bottom
    });
    this.socket.on('create-todo', (newTodo) => {
      if (currentListTodos === null) {
        currentListTodos = [];
      }
      if (!currentListTodos.includes(newTodo)) {
        currentListTodos.push(newTodo);
        this.setState({ currentListTodos });
      }
    })
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
        <View style={styles.addItemBtnContainer}>
          <Icon name="ios-add" size={30} color={grey} style={styles.plusIcon} />
          <CustomText 
            style={styles.addItemBtn}
            onPress={() => this.addTodo()}
          >
            Add item
          </CustomText>
        </View>
        <View style={styles.deleteBtnContainer}>
          <TouchableOpacity onPress={() => this.deleteList(this.id)}>
            <View style={styles.deleteListBtn}>
              <CustomText style={styles.deleteTxt}>Delete List</CustomText>
              <Icon name="ios-trash" size={30} color={grey} />
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
    fontSize: 24,
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
  addItemBtnContainer: {
    margin: 26,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addItemBtn: {
    color: grey,
    padding: 10,
    fontSize: 18,
    marginLeft: 10,
  },
  deleteBtnContainer: {
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
    fontSize: 15,
  },
})