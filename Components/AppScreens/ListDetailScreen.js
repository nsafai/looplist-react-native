import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Todo from './Components/Todo';
import { HOST_URL } from 'react-native-dotenv';
import { getData } from '../helpers/Requests';

class ListDetailScreen extends Component {
  constructor(props) {
    super(props);
    const { state } = props.navigation;
    this.id = state.params.id;
    this.title = state.params.title;
    this.todos = state.params.todos;
    this.todoComponents = [];
    this.getTodos(this.id);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title || '',
    }
  }

  state = {
    todos: [],
  }

  getTodos = (id) => {
    const url = `${HOST_URL}/lists/${id}`;
    getData(url)
      .then(res => res.json())
      .then(json => {
        let todos = [];
        const { currentListTodos } = json;
        console.log(currentListTodos);
        currentListTodos.forEach((todo, i) => {
          todos.push(
            <Todo 
              key={todo._id}
              todoId={todo._id}
              name={todo.name}
              completed={todo.completed}
            />);
        });
        this.setState({ todos });
      })
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      <ScrollView styles={styles.container}>
        <Text style={styles.title}>{this.title}</Text>
        {this.state.todos}
      </ScrollView>
    )
  }
}

export default ListDetailScreen


const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    margin: 10,
    padding: 20,
  }, 
  container: {
    flex: 1,
  },
})