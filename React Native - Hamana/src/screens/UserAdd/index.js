import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    TouchableHighlight,
    Picker,
} from 'react-native'
import styles from './style'
import { Button, Container, Content, Spinner } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
export default class UserAdd extends Component {

    constructor() {
        super();
        this.state = {
            SMS_Work_Success: false,
            isLoading: false,
            phoneNumber:'',
            password:'',
        };
    }

    signupFunction1 = () => { this.setState({ SMS_Work_Success: true }); };
    signupFunction2 = () => {
        Alert.alert("Message", "Profile Update Successfully");  
        this.setState({ SMS_Work_Success: false });
    };  
    renderBody = () => {
        if(this.state.SMS_Work_Success == true){
            return (
                <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.arrowcontainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Users')}>
                            <Image style={styles.leftarrow} source={require('../../images/left-arrow.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.txtconatiner}>
                        <Text style={{fontSize: 20, fontFamily: 'lyftpro-bold'}}>Please enter code we send to your phone number and then user profile will be update.</Text>
                    </View>
                    <View style={styles.numbercontainer}>
                        <View style={styles.Numberinput}>
                            <TouchableOpacity>
                                <TextInput
                                    placeholder='433242' style={styles.numbertxt}
                                    keyboardType="numeric"
                                    maxLength={9}
                                    onChangeText={(phoneNumberCode) => this.setState({phoneNumberCode})}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.footercontainer}>
                        <View style={styles.footercontainer_hafeez}>
                            <Button onPress={() => this.signupFunction2()} full success><Text style={styles.footercontainer_hafeez1}>Submit</Text></Button>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
                    </ScrollView>
            );
        }
        else {
            return (
                <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.arrowcontainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Users')}>
                            <Image style={styles.leftarrow} source={require('../../images/left-arrow.png')} />
                        </TouchableOpacity>
                    </View>
    
                    <View style={styles.txtconatiner}>
                        <Text style={styles.txt}>Add User</Text>
                    </View>
    
    <View style={styles.numbercontainer}>
    <View style={styles.Numberinput}>
    <TextInput placeholder='Business Name' style={styles.numbertxt} maxLength={25}/>
    </View>
    </View>
    
    
    <View style={styles.numbercontainer}>
    <View style={styles.Numberinput}>
    <TextInput placeholder='Contact Person Name' style={styles.numbertxt} maxLength={16}/>
    </View>
    </View>
    
    
    
                    <View style={styles.numbercontainer}>
                        <View style={styles.flagcontainer}>
                            <Image source={require('../../images/uk-flag.jpg')} style={{ width: 20, height: 15 }} />
                        </View>
                        <View style={styles.downarrow}>
                            <Image source={require('../../images/down-arrow.png')} style={{ width: 10, height: 10 }} />
                        </View>
                        <View style={styles.countrycode}>
                            <Text style={styles.countrycodetxt}>+44</Text>
                        </View>
                        <View style={styles.Numberinput}>
                                <TextInput 
                                placeholder='7911123456' style={styles.numbertxt}
                                keyboardType="numeric"
                                maxLength={10}/>
                        </View>
                    </View>
    
    
    <View style={styles.numbercontainer}>
    <View style={styles.Numberinput}>
    <TextInput placeholder='Email' style={styles.numbertxt} maxLength={20}/>
    </View>
    </View>
    
    <View style={styles.numbercontainer}>
    <View style={styles.Numberinput}>
    <TextInput 
        placeholder='Address'
        numberOfLines={3}
        multiline={true}
        style={styles.numbertxt}/>
    </View>
    </View>
    
    
    
    <View style={styles.numbercontainer}>
    <View style={styles.Numberinput}>
    <Picker 
      style={styles.numbertxt}
      selectedValue={this.state.language}
      onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
      <Picker.Item label="Business Type" value="0" />
      <Picker.Item label="Retail" value="Retail" />
      <Picker.Item label="Butcher / Fishmongers" value="Butcher / Fishmongers" />
      <Picker.Item label="Hot Food Retail" value="Hot Food Retail" />
      <Picker.Item label="Caterers" value="Caterers" />
      <Picker.Item label="Hospitality" value="Hospitality" />
    </Picker>
    </View>
    </View>
    
    
    
    
                    <View style={styles.footercontainer}>
                        <View style={styles.footercontainer_hafeez}>
                        <Button onPress={() => this.signupFunction1()}  full success><Text style={styles.footercontainer_hafeez1}>Submit</Text></Button>
                        </View>
                    </View>
    
                </KeyboardAvoidingView>
                </ScrollView>
            );
        }
      };
    
    render() {
        return (
          <Container>
            {this.state.isLoading === true ? (
              <Content contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Spinner color="orange" size="large" />
              </Content>
            ) : (this.renderBody())}
          </Container>
        );
      }
    
} 