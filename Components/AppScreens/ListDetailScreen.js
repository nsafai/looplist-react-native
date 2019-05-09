import React, { Component } from 'react'
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import { Button } from 'react-native-elements';
import Todo from './Components/Todo';
import { HOST_URL } from '../helpers/Requests';
import { grey } from '../helpers/Colors';
import SocketIOClient from 'socket.io-client';
import Icon from 'react-native-vector-icons/Ionicons';
import { findIndex } from 'lodash';
import styles from './Styles/ListDetailScreenStyles';

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

  deleteList() {
    this.socket.emit('delete-list', this.id);
    this.props.navigation.goBack();
  }

  toggleCheckBox = ({ todoId, currentCompletion }) => {
    const newCompletion = !currentCompletion; // if currently false, set to true & vice-versa
    this.socket.emit('toggle-todo', { todoId, completed: newCompletion });
    // Get array of todos from state, which we will update thereafter
    let { currentListTodos } = this.state;
    // Find index of todo calling this method using '_id' field
    const todoIndex = findIndex(currentListTodos, { _id: todoId });
    // Optimistically update item
    currentListTodos[todoIndex].completed = newCompletion;
    // Optimistically force re-render (will undo in callback if necessary)
    this.setState({ currentListTodos });
    this.socket.on('toggle-todo', (updatedTodo) => {
      // if for some reason, the response from server doesn't match frontend
      if (updatedTodo.completed !== newCompletion) {
        // Find index of updatedTodo from server response using '_id' field
        const updatedTodoIndex = findIndex(currentListTodos, { _id: updatedTodo._id });
        // update the value to match the response from server
        currentListTodos[updatedTodoIndex].completed = updatedTodo.completed;
        this.setState({ currentListTodos });
      }
    })
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
        this.setState({ currentListTodos }); // Force re-render of todos
      }
    })
  }

  saveTodo() {
    
    socket.emit('save-todo', {
      todoId,
      todoInputValue,
      todoIndex,
    })
  }

  resetTodos() {
    this.socket.emit('reset-all-todos', this.id);
    this.socket.on('reset-all-todos', () => {
      // Get array of todos from state, which we will update thereafter
      let { currentListTodos } = this.state;
      currentListTodos.forEach((todo) => {
        todo.completed = false; // set completion status to false for all todos
      })
      this.setState({ currentListTodos }); // Force re-render of todos
    });
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
            onPress={this.toggleCheckBox.bind(null, { 
              todoId: todo._id, 
              currentCompletion: todo.completed,
            })}
          />
        );
      });
      if (todos.length === 0) {
        return <CustomText style={styles.helperText}>You don't have any list items yet.</CustomText>;
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
          <Icon name="ios-add" size={30} color={grey} style={styles.plusIcon} onPress={() => this.addTodo()} />
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
