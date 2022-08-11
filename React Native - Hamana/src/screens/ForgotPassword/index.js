import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from 'react-native'
import styles from './style'
import { Button, Container, Content, Spinner } from 'native-base';
export default class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            email:'',
        };
    }

    forgotPasswordApi_function = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        const { email } = this.state;
        if(reg.test(email) === false){ Alert.alert('Message', 'Please enter a valid email.'); }
        else {
          this.setState({ isLoading:true, });
          return fetch("https://abidtrader.com/qzdevelopers_demo_projects/fyp_api/forgot_password.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email:email })
          }).then(res => res.json()).then(resJson => {
            this.setState({ isLoading:false, });
              resJson.map(item => {
                if(item.message === 'Success') { Alert.alert("Message", "Password sended to you email."); }
                else { Alert.alert("Message",item.message); }
              });
          });
        }        
    };


    renderBody = () => {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.arrowcontainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Image style={styles.leftarrow} source={require('../../images/left-arrow.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.txtconatiner}>
                    <Text style={styles.txt}>Forgot Password</Text>
                    <Text>We'll send password to your email.</Text>
                </View>

                <View style={styles.numbercontainer}>
                    <View style={styles.Numberinput}>
                        <TouchableOpacity>
                            <TextInput 
                            placeholder='Employee Email'
                            style={styles.numbertxt}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footercontainer}>
                    <View style={styles.footercontainer_hafeez}>
                    <Button style={{backgroundColor:'#199CA6' }} onPress={() => this.forgotPasswordApi_function()}  full><Text style={styles.footercontainer_hafeez1}>Submit</Text></Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
      };
    
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