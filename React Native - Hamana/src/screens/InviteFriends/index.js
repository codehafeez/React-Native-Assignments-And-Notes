import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Share,
  TouchableOpacity
} from 'react-native';
import { Button, Icon, } from 'native-base';
export default class InviteFriends extends Component {

    onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Mobile Vallet Parking Application',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) { alert(error.message); }
    };
    
    render() {
    return (
      <View>
      <View style={{marginLeft: 16, marginTop: 40}}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
      <Image style={{width: 15, height: 15}} source={require('../../images/left-arrow.png')} />
      </TouchableOpacity>
      </View>


        <View style={styles.container}>
        <View style={styles.bodyContent}>
        <Image style={{ marginTop:20, width:150, height:150 }} source={require('../../images/logo.png')} />
        <Text style={styles.name}>Invite to Friends</Text>
        <Text style={styles.description}>Enable contacts and</Text>
        <Text style={styles.description}>refer friends to be a part of the</Text>
        <Text style={styles.description}>Food Safety Assistant Application.</Text>              

        <Button onPress={this.onShare} style={{ justifyContent: 'center', alignItems: 'center', marginTop:30, width:200 }}  iconLeft rounded light>
        <Text>Share Now</Text><Icon name='share' />
        </Button>

        </View>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  name:{
    fontSize:22,
    marginTop:30,
    marginBottom:30,
    color:"#000",
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  description:{
    fontSize:16,
    marginTop:10,
    textAlign: 'center'
  },
});