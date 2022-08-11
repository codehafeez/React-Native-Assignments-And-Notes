import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, AsyncStorage, } from 'react-native';
import styles from './style';
import Drawermenu from '../../components/Drawermenu/index'
export default class Drawer extends Component {

    logout = () => {
        AsyncStorage.setItem("@email", '');
        this.props.navigation.navigate('App');
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.userpiccontainer}>
                        <TouchableOpacity>
                            <View style={styles.picinnercontainer}>
                                <Image style={styles.userimage} source={require('../../images/logo.png')} />
                            </View>
                            <View style={styles.username}><Text style={styles.usertxt}>Hamana</Text></View>
                        </TouchableOpacity>
                    </View>

                    <Drawermenu iconname='home' titlename='Home'/>
                    <Drawermenu iconname='file' titlename='History' navigation={() => this.props.navigation.navigate('Users')}/>
                    <Drawermenu iconname='user' titlename='Profile' navigation={() => this.props.navigation.navigate('Profile')}/>
                    <Drawermenu iconname='cog' titlename='Settings' navigation={() => this.props.navigation.navigate('Settings')}/>
                    <Drawermenu navigation={() => this.logout() } iconname='sign-out' titlename='Logout'/>

                </ScrollView>
            </View>
        );
    }
}
