import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './style'
import { Button, Picker, Container, Content, Spinner  } from 'native-base'
import DatePicker from 'react-native-datepicker'
export default class Home extends Component {

    constructor(props) {
        super(props)
        const { navigation } = this.props;
        const questionsData = navigation.getParam('questionsData');
        this.state = { 
            isLoading: false,
            email: questionsData.email,
            id: questionsData.id,
            q_ans1: questionsData.ans1,
            q_ans2: questionsData.ans2,
            q_ans3: questionsData.ans3,
            q_ans4: questionsData.ans4,
            q_ans_date:questionsData.submit_date, 
            status:"0",
        }
    }

    updateAnswer = () => { 
        const { q_ans1, q_ans2, q_ans3, q_ans4, q_ans_date, id } = this.state;
        if(q_ans1.length < 1){ Alert.alert('Message', 'Please enter answer of question 1.'); }
        else if(q_ans2.length < 1){ Alert.alert('Message', 'Please enter answer of question 2.'); }
        else if(q_ans3.length < 1){ Alert.alert('Message', 'Please enter answer of question 3.'); }
        else if(q_ans4.length < 1){ Alert.alert('Message', 'Please enter answer of question 4.'); }
        else if(q_ans_date.length < 1){ Alert.alert('Message', 'Please enter a date.'); }
        else {
          this.setState({ isLoading:true, });
          return fetch("https://abidtrader.com/qzdevelopers_demo_projects/fyp_api/update_q_ans.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q_ans1:q_ans1, q_ans2:q_ans2, q_ans3:q_ans3, q_ans4:q_ans4, q_ans_date:q_ans_date, id:id })
          }).then(res => res.json()).then(resJson => {
              // Alert.alert(JSON.stringify(resJson));
              this.setState({ isLoading:false });
              resJson.map(item => {
                if(item.message === 'Success') { Alert.alert('Message', 'Successfully Update Answers.'); }
                else { Alert.alert('Message', item.message); }
              });
          });
        }
    };

    admin_updateAnswer = () => { 
        const { status, id } = this.state;
        this.setState({ isLoading:true, });
        return fetch("https://abidtrader.com/qzdevelopers_demo_projects/fyp_api/update_q_ans_admin.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status:status, id:id })
        }).then(res => res.json()).then(resJson => {
            this.setState({ isLoading:false });
            resJson.map(item => {
              if(item.message === 'Success') { Alert.alert('Message', 'Successfully Update.'); }
              else { Alert.alert('Message', item.message); }
            });
        });
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
    
    admin_renderBody() {
        return (
            <View>
                
                <View style={styles.numbercontainer}>
                <Text style={{fontSize:16}}>Question 1: Age</Text>
                </View>
                <View style={styles.numbercontainer}>
                <View style={styles.Numberinput}>
                <TextInput placeholder='Answer' style={styles.numbertxt}
                    editable = {false} 
                    value={this.state.q_ans1}
                    onChangeText={(q_ans1) => this.setState({q_ans1})}/>
                </View>
                </View>

                <View style={styles.numbercontainer}>
                <Text style={{marginTop:20, fontSize:16}}>Question 2: Do you have Fever?</Text>
                </View>
                <View style={styles.numbercontainer}>
                <View style={styles.Numberinput}>
                <TextInput placeholder='Answer' style={styles.numbertxt}
                    editable = {false} 
                    value={this.state.q_ans2}
                    onChangeText={(q_ans2) => this.setState({q_ans2})}/>
                </View>
                </View>

                <View style={styles.numbercontainer}>
                <Text style={{marginTop:20, fontSize:16}}>Question 3: Do you have Cough/Flu?</Text>
                </View>
                <View style={styles.numbercontainer}>
                <View style={styles.Numberinput}>
                <TextInput placeholder='Answer' style={styles.numbertxt}
                    editable = {false} 
                    value={this.state.q_ans3}
                    onChangeText={(q_ans3) => this.setState({q_ans3})}/>
                </View>
                </View>

                <View style={styles.numbercontainer}>
                <Text style={{marginTop:20, fontSize:16}}>Question 4: Do you have any Recent Travel History?</Text>
                </View>
                <View style={styles.numbercontainer}>
                <View style={styles.Numberinput}>
                <TextInput placeholder='Answer' style={styles.numbertxt}
                    editable = {false} 
                    value={this.state.q_ans4}
                    onChangeText={(q_ans4) => this.setState({q_ans4})}/>
                </View>
                </View>

                <View style={styles.numbercontainer}>
                <Text style={{fontWeight:'bold', color:"#4f5dc9", marginTop:20, fontSize:16}}>Date : {this.state.q_ans_date}</Text>
                </View>

                <View style={styles.numbercontainer}>
                <View style={styles.Numberinput}>
                <Picker 
                style={styles.numbertxt}
                selectedValue={this.state.status}
                onValueChange={(itemValue, itemIndex) => this.setState({ status: itemValue })}>
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="Allow" value="Allow" />
                <Picker.Item label="Not-Allow" value="Not-Allow" />
                </Picker>
                </View>
                </View>

                <View style={styles.footercontainer}>
                <View style={styles.footercontainer_hafeez}>
                <Button style={{ backgroundColor:'#199CA6' }} onPress={() => this.admin_updateAnswer()}  full><Text style={styles.footercontainer_hafeez1}>Update</Text></Button>
                </View>
                </View>
            
            </View>
        );
    }

    user_renderBody() {
        return (
            <View>

                <View style={styles.numbercontainer}>
                <Text style={{fontSize:16}}>Question 1: Age</Text>
                </View>
                <View style={styles.numbercontainer}>
                <View style={styles.Numberinput}>
                <TextInput placeholder='Answer' style={styles.numbertxt}
                    value={this.state.q_ans1}
                    onChangeText={(q_ans1) => this.setState({q_ans1})}/>
                </View>
                </View>

                <View style={styles.numbercontainer}>
                <Text style={{marginTop:20, fontSize:16}}>Question 2: Do you have Fever?</Text>
                </View>
                <View style={styles.numbercontainer}>
                <View style={styles.Numberinput}>
                <TextInput placeholder='Answer' style={styles.numbertxt}
                    value={this.state.q_ans2}
                    onChangeText={(q_ans2) => this.setState({q_ans2})}/>
                </View>
                </View>

                <View style={styles.numbercontainer}>
                <Text style={{marginTop:20, fontSize:16}}>Question 3: Do you have Cough/Flu?</Text>
                </View>
                <View style={styles.numbercontainer}>
                <View style={styles.Numberinput}>
                <TextInput placeholder='Answer' style={styles.numbertxt}
                    value={this.state.q_ans3}
                    onChangeText={(q_ans3) => this.setState({q_ans3})}/>
                </View>
                </View>

                <View style={styles.numbercontainer}>
                <Text style={{marginTop:20, fontSize:16}}>Question 4: Do you have any Recent Travel History?</Text>
                </View>
                <View style={styles.numbercontainer}>
                <View style={styles.Numberinput}>
                <TextInput placeholder='Answer' style={styles.numbertxt}
                    value={this.state.q_ans4}
                    onChangeText={(q_ans4) => this.setState({q_ans4})}/>
                </View>
                </View>

                <View style={styles.numbercontainer}>
                    <DatePicker
                    style={{marginTop:20, width:'100%'}}
                    date={this.state.q_ans_date}
                    mode="date"
                    placeholder="Select Date"
                    format="MM-DD-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 },
                    dateInput: { marginLeft: 36 }
                    }}
                    onDateChange={(date) => {this.setState({q_ans_date: date})}}/>
                </View>

                <View style={styles.footercontainer}>
                <View style={styles.footercontainer_hafeez}>
                <Button style={{ backgroundColor:'#199CA6' }} onPress={() => this.updateAnswer()}  full><Text style={styles.footercontainer_hafeez1}>Update</Text></Button>
                </View>
                </View>
            
            </View>
        );
    }

    renderBody() {
        return (
            <ScrollView>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.arrowcontainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <Image style={styles.leftarrow} source={require('../../images/left-arrow.png')} />
            </TouchableOpacity>
            </View>

            <View style={{ marginBottom:10, justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{ fontWeight:"bold", fontSize:22, fontFamily: 'proximanova-regular'}}>Update Questionnaire</Text>
            </View>
            

            {this.state.email === "admin@gmail.com" ? (this.admin_renderBody()) : (this.user_renderBody())}
            

            </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
