import React, { Component } from 'react'
import { HOST_URL } from '../helpers/Requests';
import SocketIOClient from 'socket.io-client';
import { 
  View, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CustomText from '../CustomText';
import { Button } from 'react-native-elements';
import Todo from './Components/Todo';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/ListDetailScreenStyles';
import { grey, red } from '../helpers/Colors';
import Swipeout from 'react-native-swipeout';

class ListDetailScreen extends Component {
  navState = this.props.navigation.state;
  id = this.navState.params._id;
  title = this.navState.params.title;
  todoComponents = [];
  socket = SocketIOClient(HOST_URL); // create socket.client instance and auto-connect to server

  static navigationOptions = ({ navigation }) => {
    return {
      title: '',
    }
  }

  state = {
    title: '',
    currentListTodos: null,
    newTodoIndex: null,
  }

  componentDidMount() {
    this.getTodos();
    this.setState({
      title: this.title,
    })
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

  addTodo(todoIndex) {
    let { currentListTodos } = this.state;
    console.log(todoIndex);
    this.socket.emit('create-todo', { 
      currentListId: this.id, 
      todoIndex,
    });
    this.socket.on('create-todo', (newTodo) => {
      if (currentListTodos === null) {
        currentListTodos = [];
      }
      if (!currentListTodos.includes(newTodo)) {
        if (todoIndex === currentListTodos.length) {
          currentListTodos.push(newTodo); // add to end of list
        } else {
          /* TODO: Consider making this more efficient */
          currentListTodos.splice(newTodo.index, 0, newTodo); // Insert item at given index
          currentListTodos.forEach((todo, index) => todo.index = index) // remap current list's todo indexes
        }
      }
      this.setState({ currentListTodos, newTodoIndex: newTodo.index }); // Force re-render of todos
    })
  }

  deleteTodo(todoId) {
    console.log('hellloo')
    this.socket.emit('delete-todo', todoId)
    let { currentListTodos } = this.state;
    currentListTodos = currentListTodos.filter((todo) => todo._id !== todoId);
    this.setState({ currentListTodos });
  }

  saveListName(newListName) {
    this.setState({ title: newListName })
    this.socket.emit('save-list-name', {
      currentListId: this.id,
      newListName,
    })
  }

  resetTodos() {
    this.socket.emit('reset-all-todos', this.id);
    let { currentListTodos } = this.state; // get current state of todos

    // keep track of previous state incase we receive an error
    previousState = JSON.parse(JSON.stringify([...currentListTodos]));

    // Optimistically update the frontend
    currentListTodos.forEach((todo) => {
      todo.completed = false; // set completion status to false for all todos
    });
    this.setState({ currentListTodos }); // Force re-render of todos

    // If server has an error updating the list
    this.socket.on('reset-all-todos-error', (err) => {
      // return state to previous state
      this.setState({ currentListTodos: previousState })
    })
  }

  renderTodos() {
    const { currentListTodos, newTodoIndex } = this.state;

    if (currentListTodos === null) {
      return <ActivityIndicator size='large' />;
    } else {
      let todos = [];
      let autofocus = false;
      currentListTodos.forEach((todo, index) => {
        if (index === newTodoIndex) {
          autofocus = true;
        }
        todos.push(
          <Swipeout right={[{
              text: 'Delete',
              backgroundColor: red,
              onPress: () => { this.deleteTodo(todo._id) }
            }]}
            autoClose={true}
            backgroundColor='transparent'
            key={`swipe-${todo._id}`}
          >
            <Todo 
              key={todo._id}
              autofocus={autofocus}
              todoId={todo._id}
              todoName={todo.name}
              todoIndex={todo.index}
              completed={todo.completed}
              onSubmitEditing={() => this.addTodo(todo.index + 1)}
            />
          </Swipeout>
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
    const { currentListTodos } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleAndBtn}>
          <TextInput
            style={styles.title}
            onChangeText={(text) => this.saveListName(text)}
            value={this.state.title}
            multiline
          />
          <Button 
            title="Reset All" 
            onPress={() => this.resetTodos()}
            buttonStyle={styles.resetBtn}
          />
        </View>
        {this.renderTodos()}
        <View style={styles.addItemBtnContainer}>
          <Icon 
            name="ios-add" 
            size={30} 
            color={grey} 
            style={styles.plusIcon} 
            onPress={() => this.addTodo(currentListTodos.length)} 
          />
          <CustomText 
            style={styles.addItemBtn}
            onPress={() => this.addTodo(currentListTodos.length)}
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
