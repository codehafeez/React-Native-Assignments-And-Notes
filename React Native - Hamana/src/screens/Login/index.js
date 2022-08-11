import React, { Component } from 'react'
import { Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Alert, AsyncStorage,
} from 'react-native'
import styles from './style'
import { Button, Container, Content, Spinner } from 'native-base';
export default class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            email:'',
            password:'',
        };
    }

    loginFunction = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        const { email, password } = this.state;
        if(reg.test(email) === false){ Alert.alert('Message', 'Please enter a valid email.'); }
        else if(password.length < 5){ Alert.alert('Message', 'Password should be more than 5 chars.'); }
        else {
          this.setState({ isLoading:true, });
          return fetch("https://abidtrader.com/qzdevelopers_demo_projects/fyp_api/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email:email, password:password })
          }).then(res => res.json()).then(resJson => {
              // Alert.alert(JSON.stringify(resJson));
              resJson.map(item => {
                if(item.message === 'Success') {  this._storeData (item.name, email, item.department); }
                else {
                  this.setState({ isLoading:false, });
                  Alert.alert("Message",item.message); }
              });
          });
        }
    };
  
    _storeData = async (name, email, department) => {
      try {
        await AsyncStorage.setItem("@email", email);
        await AsyncStorage.setItem("@name", name);
        await AsyncStorage.setItem("@department", department);
        this.setState({ name:'', email:'', department:'0' });
          this.props.navigation.navigate('Home');
        } catch (error) { alert(error); }
    };


    renderBody = () => {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.arrowcontainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MainScreen')}>
                        <Image style={styles.leftarrow} source={require('../../images/left-arrow.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.txtconatiner}><Text style={styles.txt}>Login</Text></View>

                <View style={styles.numbercontainer}>
                    <View style={styles.Numberinput}>
                        <TextInput 
                            placeholder="Employee Email"
                            style={styles.numbertxt}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}/>
                    </View>
                </View>

                <View style={styles.numbercontainer}>
                    <View style={styles.Numberinput}>
                            <TextInput 
                            secureTextEntry={true} 
                            placeholder='Password'
                            style={styles.numbertxt}
                            maxLength={10}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}/>
                    </View>
                </View>



                <View style={styles.footercontainer}>
                    <View style={styles.footercontainer_hafeez}>
                    <Button style={{backgroundColor:'#199CA6' }} onPress={() => this.loginFunction()}  full><Text style={styles.footercontainer_hafeez1}>Submit</Text></Button>
                    </View>
                </View>

              <View style={{justifyContent: 'center',alignItems: 'center',}}>
              <Text onPress={() => this.props.navigation.navigate('ForgotPassword')} style={{fontSize:16}}>Forgot your password?</Text>
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