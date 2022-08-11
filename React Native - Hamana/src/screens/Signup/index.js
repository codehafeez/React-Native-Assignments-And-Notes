import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Alert, Picker, } from 'react-native'
import styles from './style'
import { Button, Container, Content, Spinner } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
export default class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            name:'',
            email:'',
            password:'',
            confirm_password:'',
            department:'0',
        };
    }

    signupFunction = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        const { name, email, password, confirm_password, department } = this.state;
        if(name.length < 2){ Alert.alert('Message', 'Please enter a valid ful name.'); }
        else if(reg.test(email) === false){ Alert.alert('Message', 'Please enter a valid email.'); }
        else if(department === '0'){ Alert.alert('Message', 'Please select a department.'); }
        else if(password.length < 5){ Alert.alert('Message', 'Password should be more than 5 chars.'); }
        else if(password !== confirm_password) { Alert.alert("Message", "Sorry both password not match."); }
        else {
          this.setState({ isLoading:true, });
          return fetch("https://abidtrader.com/qzdevelopers_demo_projects/fyp_api/signup.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name:name, email:email, password:password, department:department })
          }).then(res => res.json()).then(resJson => {
              // Alert.alert(JSON.stringify(resJson));
              resJson.map(item => {
                if(item.message === 'Success') { 
                  this._storeData (name, email, department); 
                }
                else {
                  this.setState({ isLoading:false });
                  Alert.alert("Message",item.message);
                }
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
                <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.arrowcontainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MainScreen')}>
                            <Image style={styles.leftarrow} source={require('../../images/left-arrow.png')} />
                        </TouchableOpacity>
                    </View>    
                    <View style={styles.txtconatiner}><Text style={styles.txt}>Signup</Text></View>
    
    
    <View style={styles.numbercontainer}>
    <View style={styles.Numberinput}>
    <TextInput 
        placeholder="Full Name"
        style={styles.numbertxt}
        value={this.state.name}
        onChangeText={(name) => this.setState({name})}/>
    </View>
    </View>
    

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
    <Picker 
      style={styles.numbertxt}
      selectedValue={this.state.department}
      onValueChange={(itemValue, itemIndex) => this.setState({ department: itemValue })}>
      <Picker.Item label="Department" value="0" />
      <Picker.Item label="ABC" value="ABC" />
      <Picker.Item label="XYZ" value="XYZ" />
    </Picker>
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
    
    <View style={styles.numbercontainer}>
    <View style={styles.Numberinput}>
    <TextInput
        secureTextEntry={true} 
        placeholder='Confirm Password'
        style={styles.numbertxt}
        maxLength={10}
        value={this.state.confirm_password}
        onChangeText={(confirm_password) => this.setState({confirm_password})}/>
    </View>
    </View>
    
    
    
                    <View style={styles.footercontainer}>
                        <View style={styles.footercontainer_hafeez}>
                        <Button style={{backgroundColor:'#199CA6' }} onPress={() => this.signupFunction()}  full><Text style={styles.footercontainer_hafeez1}>Submit</Text></Button>
                        </View>
                    </View>
    
                </KeyboardAvoidingView>
                </ScrollView>
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