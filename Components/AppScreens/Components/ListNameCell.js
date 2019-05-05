import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'

// This component displays the name of a list as one 
// row in the FlatList in HomeScreen. 
// The whole cell needs to be tap-able so it is all 
// wrapped in TouchableHighLight. 
// The action when tapped is assigned by the onPress prop. 
// This was set in HomeScreen where the cells are created. 
// The underlayColor prop sets the background color when 
// tapped.
// Go back to HomeScreen.js 

const ListNameCell = ({ item, onPress }) => {
  return (
    <TouchableHighlight 
      style={{ marginLeft:10, marginRight:10 }}
      underlayColor='#6af'
      onPress={onPress}
    >
      <View style={styles.cell} >
        <Text style={styles.text}>{item}</Text>
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