import React, { Component } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { Font } from 'expo';

class CustomText extends Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Comfortaa': require('../assets/fonts/Comfortaa.ttf')
    });
    this.setState({ fontLoaded: true })
  }
  
  setFontType = type => {
    switch(type) {
      case 'normal':
        return 'Comfortaa';
      default:
        return 'Comfortaa';
    }
  }
  
  render() {
    const font = this.setFontType(this.props.type ? this.props.type : 'normal');
    const style = [{ fontFamily: font }, this.props.style || {} ];
    const allProps = Object.assign({}, this.props, {style:style})
    if (this.state.fontLoaded) {
      return <Text {...allProps}>{this.props.children}</Text>;
    } else {
      return <ActivityIndicator size='large' />;
    }
  }
}

export default CustomText;