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
        <Text style={styles.disclosureIcon}>✅</Text>
        <Text style={styles.text}>{todoId}</Text>
      </View>
    );
  }
}

export default Todo;

const styles = StyleSheet.create({
  cell: {
    borderBottomWidth: 1, 
    borderColor: '#999',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0
  },
  text:{
    margin: 10,
    fontSize: 20
  },
  disclosureIcon: {
  }
})