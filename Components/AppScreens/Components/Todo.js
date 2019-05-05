import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'

class Todo extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    todos: [],
  }

  componentDidMount() {
    console.log(this.props.completed);
    this.setState({
      checked: this.props.completed,
    })
  }

  render() {
    const { todoId, completed, name } = this.props;
    
    return (
      <View style={styles.cell} >
        <CheckBox 
          style={styles.checkbox}
          checked={this.state.checked}
          checkedColor={'#28a745'}
          onPress={() => this.setState({checked: !this.state.checked})}
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