import React, { Component } from 'react'
import Navigtaion from './src/components/screensnavigation/index';
import { View } from 'react-native';
import { Font } from 'expo';
// import * as Font from 'expo-font';
export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { loading:false };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
        'lyftpro-bold': require('./assets/fonts/lyftpro-bold.ttf'),
        'lyftpro-light': require('./assets/fonts/lyftpro-light.ttf'),
        'lyftpro-medium': require('./assets/fonts/lyftpro-medium.ttf'),
        'lyftpro-semibold': require('./assets/fonts/lyftpro-semibold.ttf'),
        'proximanova-bold': require('./assets/fonts/proximanova-bold.ttf'),
        'proximanova-medium': require('./assets/fonts/proximanova-medium.ttf'),
        'proximanova-regular': require('./assets/fonts/proximanova-regular.ttf'),
    });
    this.setState({ loading:true });
  }

  render() {
    if (this.state.loading) {
      return <Navigtaion/>;
    }
    return(<View></View>)
  }
}