import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { green } from '../../helpers/Colors';
import { findIndex } from 'lodash';
import { HOST_URL } from '../../helpers/Requests';
import SocketIOClient from 'socket.io-client';

class Todo extends Component {
  socket = SocketIOClient(HOST_URL); // create socket.client instance and auto-connect to server

  state = {
    todoName: '',
    completed: false,
  }

  componentDidMount() {
    this.setState({
      todoName: this.props.todoName,
      completed: this.props.completed,
    })
  }

  saveTodo(newName) {
    this.setState({ todoName: newName })
    const { todoId, todoIndex } = this.props;
    this.socket.emit('save-todo', {
      todoId,
      todoInputValue: newName,
      todoIndex,
    })
  }

  toggleCheckBox = ({ todoId, completed }) => {
    const newCompletion = !completed; // if currently false, set to true & vice-versa
    this.socket.emit('toggle-todo', { todoId, completed: newCompletion });
    // Optimistically force re-render (will undo in callback if necessary)
    this.setState({ completed: newCompletion });
    this.socket.on('toggle-todo', (updatedTodo) => {
      // if for some reason, the response from server doesn't match frontend
      if (updatedTodo.completed !== newCompletion) {
        // update the value to match the response from server
        this.setState({ completed: updatedTodo.completed });
      }
    })
  }

  render() {
    const { todoId } = this.props;
    const { completed } = this.state;
    
    return (
      <View style={styles.cell} >
        <CheckBox 
          style={styles.checkbox}
          checkedIcon='check-circle'
          uncheckedIcon='circle'
          checked={completed}
          checkedColor={green}
          data-todoId={todoId}
          size={30}
          onPress={() => this.toggleCheckBox({ todoId, completed })}
        />
        <TextInput
          style={styles.text}
          onChangeText={(text) => this.saveTodo(text)}
          value={this.state.todoName}
        />
      </View>
    );
  }
}

export default Todo;

const styles = StyleSheet.create({
  cell: {
    borderBottomWidth: 1, 
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 60,
  },
  text:{
    paddingVertical: 25,
    fontSize: 16,
    width: '100%',
  },
  checkbox: {
    marginLeft: 40,
  }
})