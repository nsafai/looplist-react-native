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
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    margin: 0,
    width: '100%',
  },
  text:{
    padding: 20,
    fontSize: 20,
    margin: 0,
  },
  disclosureIcon: {
    margin: 0,
  }
})