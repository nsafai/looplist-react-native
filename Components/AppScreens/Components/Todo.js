import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { postData } from '../../helpers/Requests';
import { HOST_URL } from 'react-native-dotenv';

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    todos: [],
    completed: this.props.completed,
  }

  pressChkBox = (todoId) => {
    const url = `https://loop-list.herokuapp.com/todos/toggle/${todoId}`;
    // send post request to update todo
    postData(url, {})
      .then(res => res.json())
      .then(json => {
        if (json) {
          const completed = json.completed;
          this.setState({ completed });
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { todoId, name, completed } = this.props;
    
    return (
      <View style={styles.cell} >
        <CheckBox 
          style={styles.checkbox}
          checked={this.state.completed}
          checkedColor={'#28a745'}
          onPress={() => this.pressChkBox(todoId)}
          data-todoId={todoId}
          size={30}
        />
        <Text style={styles.text}>{name}</Text>
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
  },
  text:{
    margin: 10,
    fontSize: 20
  },
  checkbox: {
    marginLeft: 40,
  }
})