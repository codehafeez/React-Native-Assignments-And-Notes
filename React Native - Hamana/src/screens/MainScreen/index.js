import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StatusBar, ImageBackground, AsyncStorage } from 'react-native'
import { Container, Content, Spinner } from 'native-base';
import styles from './style'
export default class MainScreen extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
		};
    }
    
    componentDidMount() {
        this._retrieveData();
    } 

    _retrieveData = async () => {
        try {
            const sessionLogin = await AsyncStorage.getItem('@email');
            if(sessionLogin !== null){  this.props.navigation.navigate('Home'); }
            else { this.setState({ isLoading:false }); }
        } catch (error) { alert(error); }
    };


    renderBody() {
        return (
            <ImageBackground source={require('../../images/login.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>

                    <StatusBar
                        backgroundColor="black"
                        barStyle="dark-content"
                        translucent={true}
                    />
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                            <Text style={styles.btntxt}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttoncontainer1}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={[styles.btntxt, { color: 'white' }]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                    </View>

                </View>
            </ImageBackground>
        )
    }

    render() {
        return (
          <Container>
            {this.state.isLoading === true ? (
              <Content contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Spinner color="#199CA6" size="large" />
              </Content>
            ) : (this.renderBody())}
          </Container>
        );
    }
}