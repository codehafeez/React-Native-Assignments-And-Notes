import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Container, Content, Accordion } from "native-base";
const dataArray = [
  { 
    title: " What is Food Safety Assistant", 
    content: "Cheetay is your new best friend. Our coalition of cheetahs roam the city to get you food from the best restaurants across town.\n\n There is no location in Lahore we won’t deliver to, and there are now no restaurants that don’t have delivery. You can also track your cheetah as he speeds your way with your food; if you’re into that sort of a thing." 
  },
  { 
    title: " How do I track my order?",
    content: "The tracker can be found in the ‘Orders’ tab on the top right corner of the page. Click on ‘track your order’, and see where your cheetah is in Lahore." },
  { 
    title: " How do I browse restaurants near me? ",
    content: "Just enter in your location and we’ll show you a list. If you sort it by delivery timings, you’ll have the list in order of those nearest to you on top."
  }
];
export default class FAQ extends Component {

  render() {
    return (
      <View>
      <View style={{marginLeft: 16, marginTop: 40}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
              <Image style={{width: 15, height: 15}} source={require('../../images/left-arrow.png')} />
          </TouchableOpacity>
      </View>

        <Text style={styles.name}>FREQUENTLY ASKED QUESTIONS</Text>
        <Accordion style={{padding:10}} dataArray={dataArray} icon="add" expandedIcon="remove"/>
                
        </View>
    );
  }
}

const styles = StyleSheet.create({
  name:{
    marginTop:20,
    textAlign:"center",
    alignItems:"center",
    fontSize:16,
    marginBottom:20,
    color:"#000",
    fontWeight:'600',
  },
});