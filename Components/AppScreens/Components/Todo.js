import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { green } from '../../helpers/Colors';

class Todo extends Component {
  state = {
    text: this.props.name,
  }

  render() {
    const { todoId, name, completed, onPress } = this.props;
    
    return (
      <View style={styles.cell} >
        <CheckBox 
          style={styles.checkbox}
          checkedIcon='check-circle'
          uncheckedIcon='circle'
          checked={completed}
          checkedColor={green}
          onPress={onPress}
          data-todoId={todoId}
          size={30}
        />
        <TextInput
          style={styles.text}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        {/* <Text style={styles.text}>{name}</Text> */}
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