import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import CustomText from '../CustomText';
import { Button } from 'react-native-elements';
import Todo from './Components/Todo';
import { HOST_URL } from 'react-native-dotenv';
import { getData } from '../helpers/Requests';
import { green } from '../helpers/Colors';

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
      title: '',
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

  renderTodos() {
    const { todos } = this.state;
    if (todos.length > 0) {
      return todos;
    } else {
      return <ActivityIndicator size='large' />;
    }
  }

  resetTodos() {

  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleAndBtn}>
          <CustomText style={styles.title}>{this.title}</CustomText>
          <Button 
            title="Reset All" 
            onPress={this.resetTodos}
            buttonStyle={styles.resetBtn}
          />
        </View>
        {this.renderTodos()}
      </ScrollView>
    )
  }
}

export default ListDetailScreen


const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  }, 
  titleAndBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: 10,
    padding: 20,
  },
  resetBtn: {
    backgroundColor: green,
    width: 100,
  }
})