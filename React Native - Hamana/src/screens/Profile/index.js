import React, { Component } from 'react'
import { Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Alert, Picker, AsyncStorage } from 'react-native'
import styles from './style'
import { Button, Container, Content, Spinner } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            name: "",
            email: "",
            department: "0",
        };
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
			      const name = await AsyncStorage.getItem('@name');
            const email = await AsyncStorage.getItem('@email');
			      const department = await AsyncStorage.getItem('@department');
			      this.setState({ name:name, email:email, department:department, isLoading:false });			
        } catch (error) { alert(error); }
    };
    
    updateProfile = () => { 
        const { name, email, department } = this.state;
        if(name.length < 2){ Alert.alert('Message', 'Please enter a valid ful name.'); }
        else if(department === '0'){ Alert.alert('Message', 'Please select a department.'); }
        else {
          this.setState({ isLoading:true, });
          return fetch("https://abidtrader.com/qzdevelopers_demo_projects/fyp_api/update-profile.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name:name, email:email, department:department })
          }).then(res => res.json()).then(resJson => {
              // Alert.alert(JSON.stringify(resJson));
              this.setState({ isLoading:false });
              resJson.map(item => {
                if(item.message === 'Success') { this._storeData (name, department); }
                else { this.setState({ isLoading:false }); }
              });
          });
        }
    };
  
    _storeData = async (name, department) => {
      try {
        await AsyncStorage.setItem("@name", name);
        await AsyncStorage.setItem("@department", department);
        Alert.alert("Message","Profile update successfully...");
        } catch (error) { alert(error); }
    };
    
    renderBody = () => {
            return (
                <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.arrowcontainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <Image style={styles.leftarrow} source={require('../../images/left-arrow.png')} />
                        </TouchableOpacity>
                    </View>
    
                    <View style={styles.txtconatiner}><Text style={styles.txt}>Profile</Text></View>
    
    
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
            <TextInput editable = {false} placeholder='Employee Email' style={styles.numbertxt} value={this.state.email}/>
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
    
    
                    <View style={styles.footercontainer}>
                        <View style={styles.footercontainer_hafeez}>
                        <Button style={{backgroundColor:'#199CA6' }} onPress={() => this.updateProfile()}  full><Text style={styles.footercontainer_hafeez1}>Submit</Text></Button>
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