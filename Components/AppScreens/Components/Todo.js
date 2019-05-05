import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Todo extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    todos: [],
  }

  componentDidMount() {
  }

  render() {
    const { todoId, completed, name } = this.props;
    return (
      <View style={styles.cell} >
        <Text style={styles.checkbox}>✅</Text>
        <Text style={styles.text}>{name}</Text>
      </View>
    );
  }
}

export default Todo;

const styles = StyleSheet.create({
  cell: {
    borderBottomWidth: 1, 
    borderColor: '#111',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  text:{
    margin: 10,
    marginLeft: 30,
    fontSize: 20
  },
  checkbox: {
    marginLeft: 10,
  }
})