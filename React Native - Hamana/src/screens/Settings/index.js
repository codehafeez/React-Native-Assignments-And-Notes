import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, AsyncStorage, Alert } from 'react-native'
import { Button, Container, Content, Spinner } from 'native-base';
import styles from './style'
export default class Settings extends Component {

    constructor() {
        super();
        this.state = {
			isLoading: true,
			email:'',
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',            
		};
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
			const email = await AsyncStorage.getItem('@email');
			this.setState({ email:email, isLoading:false });			
        } catch (error) { alert(error); }
	};
	
    updatePassword_Function = () => {
		const { email, oldPassword, newPassword, confirmPassword } = this.state;
		if(oldPassword.length < 5){ Alert.alert("Message", "Old Password should be more than 5 chars."); }
		else if(newPassword.length < 5){ Alert.alert("Message", "New Password should be more than 5 chars."); }
		else if(newPassword !== confirmPassword) { Alert.alert("Message", "Sorry new password and confirm password not match."); }
		else {
			this.setState({ isLoading:true, });
			return fetch("https://abidtrader.com/qzdevelopers_demo_projects/fyp_api/update-password.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email:email, oldPassword:oldPassword, newPassword:newPassword })
			}).then(res => res.json()).then(resJson => {
				// Alert.alert(JSON.stringify(resJson));
				this.setState({ isLoading:false, oldPassword:'', newPassword:'', confirmPassword:'', });
				resJson.map(item => {
				if(item.message === 'Success') {
					Alert.alert("Message","Password successfully updated.."); }
				else { Alert.alert("Message",item.message); }
				});
			});
		}
    };
        
    renderBody = () => {
		return (
			<View>
				<View style={styles.txtconatiner}><Text style={styles.txt}>Change Password</Text></View>
				<View style={styles.numbercontainer}>
					<View style={styles.Numberinput}>
						<TextInput style={styles.numbertxt}
							placeholder="Old Password"
							secureTextEntry={true}
							maxLength={10}
							value={this.state.oldPassword}
							onChangeText={(oldPassword) => this.setState({oldPassword})}/>
					</View>
				</View>
				<View style={styles.numbercontainer}>
					<View style={styles.Numberinput}>
						<TextInput style={styles.numbertxt}
							placeholder="New Password"
							maxLength={10}
							secureTextEntry={true}
							value={this.state.newPassword}
							onChangeText={(newPassword) => this.setState({newPassword})}/>
					</View>
				</View>
				<View style={styles.numbercontainer}>
					<View style={styles.Numberinput}>
						<TextInput style={styles.numbertxt}
							placeholder="Confirm Password"
							maxLength={10}
							secureTextEntry={true}
							value={this.state.confirmPassword}
							onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
					</View>
				</View>
				<View style={styles.footercontainer}>
					<View style={styles.footercontainer_hafeez}>
						<Button style={{backgroundColor:'#199CA6' }} onPress={() => this.updatePassword_Function() } full><Text style={styles.footercontainer_hafeez1}>Submit</Text></Button>
					</View>
				</View>
			</View>
		);
    };

    render() {
        return (
            <Container>
            {this.state.isLoading === true ? (
              <Content contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Spinner color="#199CA6" size="large" />
              </Content>
            ) : (
                
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
					<View style={{marginLeft: 20, marginTop: 30}}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
							<Image style={{width: 20, height: 20}} source={require('../../images/left-arrow.png')} />
						</TouchableOpacity>
					</View>
                    <View>{this.renderBody()}</View>
                </KeyboardAvoidingView>            
            )}
          </Container>
        )
    }
}
