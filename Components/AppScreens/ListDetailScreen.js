import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import CustomText from '../CustomText';
import { Button } from 'react-native-elements';
import Todo from './Components/Todo';
import { HOST_URL } from 'react-native-dotenv';
import { getData, postData } from '../helpers/Requests';
import { green } from '../helpers/Colors';

class ListDetailScreen extends Component {
  constructor(props) {
    super(props);
    const { state } = props.navigation;
    this.id = state.params.id;
    this.title = state.params.title;
    this.todoComponents = [];
    this.getTodos(this.id);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: '',
    }
  }

  state = {
    currentListTodos: [],
  }

  getTodos = (id) => {
    if (id) {
      const url = `https://loop-list.herokuapp.com/lists/${id}`;
      getData(url)
        .then(res => {
          // console.log(res);
          if(res.status >= 200 && res.status < 300) {
            return res.json();
          } else {
            throw new Error("Server can't be reached!");
          }
        })
        .then(json => {
          console.log(json);
          const { currentListTodos } = json;
          if (currentListTodos) {
            this.setState({ currentListTodos });
          }
        })
        .catch(err => console.log(err))
    }
  }

  renderTodos() {
    const { currentListTodos } = this.state;
    let todos = [];
    currentListTodos.forEach((todo) => {
      todos.push(
        <Todo 
          key={todo._id}
          todoId={todo._id}
          name={todo.name}
          completed={todo.completed}
        />
      );
    });
    if (todos.length > 1) {
      return todos;
    } else {
      return <CustomText style={styles.helperText}>You don't have any todos yet, add them on www.looplist.xyz</CustomText>;
    }
  }

  resetTodos(id) {
    const url = `https://loop-list.herokuapp.com/lists/reset/${id}`;
    postData(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(json => {
        const currentListTodos = json;
        this.setState({ currentListTodos });
      })
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleAndBtn}>
          <CustomText style={styles.title}>{this.title}</CustomText>
          <Button 
            title="Reset All" 
            onPress={() => this.resetTodos(this.id)}
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
  },
  helperText: {
    padding: 30,
  }
})