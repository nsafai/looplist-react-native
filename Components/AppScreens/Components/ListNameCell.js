import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';


const ListNameCell = ({ list, onPress }) => {
  const { title, todos } = list;
  return (
    <TouchableHighlight 
      style={{ marginLeft:10, marginRight:10 }}
      underlayColor='#6af'
      onPress={onPress}
    >
      <View style={styles.cell} >
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.disclosureIcon}>〉</Text>
      </View>
    </TouchableHighlight>
  )
}

export default ListNameCell

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