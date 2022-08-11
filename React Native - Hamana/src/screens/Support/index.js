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
    title: " Online Help Center", 
    content: "For the years of working we managed to define the most popular questions of our visitors and clients. That’s why we decided to make Online Help Center. There you’ll find the best articles and recommendations concerning the questions of choosing, editing and managing your template." 
  },
  { 
    title: " Live Support Chat",
    content: "Welcome to our Support Chat if you have questions on choosing, purchasing or editing our templates! Here you will quickly get information from Support Chat operators. This service is available 24 hours a day and 7 days a week." },
  { 
    title: " Report spam",
    content: "Help TemplateMonster fight spam, scam, phishing and other kinds of unauthorized mailing episodes mentioning TemplateMonster’s name by reporting such cases."
  }
];
export default class Support extends Component {

  render() {
    return (
      <View>
      <View style={{marginLeft: 16, marginTop: 40}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
              <Image style={{width: 15, height: 15}} source={require('../../images/left-arrow.png')} />
          </TouchableOpacity>
      </View>

        <Text style={styles.name}>SUPPORT</Text>
        <Accordion style={{padding:10}} dataArray={dataArray} expanded={0}/>
                
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