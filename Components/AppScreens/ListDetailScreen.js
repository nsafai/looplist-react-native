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
    
    this.todos.forEach((todoId, i) => {
      this.todoComponents.push(<Todo key={todoId} todoId={todoId} />);
    });
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
        const { currentList, currentListTodos } = json;
        console.log(currentListTodos);
        this.setState( {
          todos: currentListTodos,
        })
      })
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      <ScrollView styles={styles.container}>
        <Text style={styles.title}>{this.title}</Text>
        {this.todoComponents}
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
  feature: {
    fontSize: 16,
    margin: 10
  },
  scrollView: {
    flex: 1,
  },
  container: {
    margin: 10
  }
})