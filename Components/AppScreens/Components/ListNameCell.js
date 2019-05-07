import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { grey } from '../../helpers/Colors';

const ListNameCell = ({ list, onPress }) => {
  const { title, todos } = list;
  return (
    <TouchableHighlight 
      style={styles.cellContainer}
      underlayColor='#6af'
      onPress={onPress}
    >
      <View style={styles.cell} >
        <Text style={styles.text}>{title}</Text>
        <Icon name="ios-arrow-forward" size={18} color={grey} />
      </View>
    </TouchableHighlight>
  )
}

export default ListNameCell

const styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
  },
  cell: {
    borderBottomWidth: 1, 
    borderColor: '#ddd',
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  text:{
    fontSize: 16,
  },
})