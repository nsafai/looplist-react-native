import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todoId, name, completed, onPress } = this.props;
    
    return (
      <View style={styles.cell} >
        <CheckBox 
          style={styles.checkbox}
          checked={completed}
          checkedColor={'#28a745'}
          onPress={onPress}
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