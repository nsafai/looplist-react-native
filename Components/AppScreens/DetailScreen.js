import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

// This screen displays details about a breed. It takes 
// in a breed object with all of the properties. Remember 
// not all breeds have all or the same properties. 
// To solve this we loop through all keys and display 
// each key and it's value in a DetailFeature 

class DetailScreen extends Component {
  constructor(props) {
    super(props)
    const { state } = props.navigation
    this.breed  = state.params.breed

    const keys = Object.keys(state.params)
    this.todos = []
    console.log(state);
    console.log(props)

    keys.forEach((key, i) => {
      console.log(state.params[key]);
      // this.features.push(<Text>{keys}</Text>)
      // this.features.push(<DetailFeature key={key} label={key} value={state.params[key]} />)
    })
  }

  // static navigationOptions = {
  //   title: this.breed
  // }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params || '',
    }
  }
  
  render() {
    return (
      <ScrollView>
        <View styles={styles.container}>
          <Text style={styles.title}>{this.breed}</Text>
          {this.features}
        </View>
      </ScrollView>
    )
  }
}

export default DetailScreen


const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    margin: 10
  }, 
  feature: {
    fontSize: 16,
    margin: 10
  },
  scrollView: {
    flex: 1,
  },
  container: {
    margin: 10
  }
})