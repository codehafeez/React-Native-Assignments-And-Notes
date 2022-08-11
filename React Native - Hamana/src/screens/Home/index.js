import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, Alert, TextInput, AsyncStorage, ScrollView } from 'react-native';
import styles from './style'
import { Drawer, Button, Container, Content, Spinner } from 'native-base';
import DatePicker from 'react-native-datepicker'
import SideBar from '../Drawer/index';
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            q_ans1: "",
            q_ans2: "",
            q_ans3: "",
            q_ans4: "",
            q_ans_date: "",
            email: "",
            date:"2020-12-25",
            modalVisible: false,
        };
        this._retrieveData();
    }

    closeDrawer() { this.drawer._root.close() };
    openDrawer() { this.drawer._root.open() };
    setModalVisible(visible) { this.setState({ modalVisible: visible }); }
    setModalclose = () => { this.setState({ modalVisible: false }); }
    _retrieveData = async () => {
        try {
            const email = await AsyncStorage.getItem('@email');
			this.setState({ email:email, isLoading:false });			
        } catch (error) { alert(error); }
    };
    
    submitAnswer = () => { 
        const { q_ans1, q_ans2, q_ans3, q_ans4, q_ans_date, email } = this.state;
        if(q_ans1.length < 1){ Alert.alert('Message', 'Please enter answer of question 1.'); }
        else if(q_ans2.length < 1){ Alert.alert('Message', 'Please enter answer of question 2.'); }
        else if(q_ans3.length < 1){ Alert.alert('Message', 'Please enter answer of question 3.'); }
        else if(q_ans4.length < 1){ Alert.alert('Message', 'Please enter answer of question 4.'); }
        else if(q_ans_date.length < 1){ Alert.alert('Message', 'Please enter a date.'); }
        else {
          this.setState({ isLoading:true, });
          return fetch("https://abidtrader.com/qzdevelopers_demo_projects/fyp_api/submit_q_ans.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q_ans1:q_ans1, q_ans2:q_ans2, q_ans3:q_ans3, q_ans4:q_ans4, q_ans_date:q_ans_date, email:email })
          }).then(res => res.json()).then(resJson => {
              // Alert.alert(JSON.stringify(resJson));
              this.setState({ isLoading:false, q_ans1:"", q_ans2:"", q_ans3:"", q_ans4:"", q_ans_date:"" });
              resJson.map(item => {
                if(item.message === 'Success') { Alert.alert('Message', 'Successfully Submit Answers.'); }
                else { Alert.alert('Message', item.message); }
              });
          });
        }
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

    adminView_renderBody() {
        return (
            <View style={{marginTop:200, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                <Image style={{ width: 100, height: 100, borderRadius:50 }} source={require('../../images/logo.png')} />
                </View>
                <Text style={{ marginTop:20, textAlign:'center', fontWeight:"bold", fontSize:22, fontFamily: 'proximanova-regular'}}>Welcome to Hamana{'\n\n'}Login by Admin</Text>
            </View>
        );
    };

    userView_renderBody() {
        return (
            <ScrollView style={{padding:5}}>
            <View style={{ marginTop:60, marginBottom:10, justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{ fontWeight:"bold", fontSize:22, fontFamily: 'proximanova-regular'}}>Questionnaire</Text>
            </View>

            <View style={styles.numbercontainer}>
            <Text style={{fontSize:16}}>Question 1: Age</Text>
            </View>
            <View style={styles.numbercontainer}>
            <View style={styles.Numberinput}>
            <TextInput 
                placeholder="Answer"
                style={styles.numbertxt}
                value={this.state.q_ans1}
                onChangeText={(q_ans1) => this.setState({q_ans1})}/>
            </View>
            </View>


            <View style={styles.numbercontainer}>
            <Text style={{marginTop:20, fontSize:16}}>Question 2: Do you have Fever?</Text>
            </View>
            <View style={styles.numbercontainer}>
            <View style={styles.Numberinput}>
            <TextInput 
                placeholder="Answer"
                style={styles.numbertxt}
                value={this.state.q_ans2}
                onChangeText={(q_ans2) => this.setState({q_ans2})}/>
            </View>
            </View>


            <View style={styles.numbercontainer}>
            <Text style={{marginTop:20, fontSize:16}}>Question 3: Do you have Cough/Flu?</Text>
            </View>
            <View style={styles.numbercontainer}>
            <View style={styles.Numberinput}>
            <TextInput 
                placeholder="Answer"
                style={styles.numbertxt}
                value={this.state.q_ans3}
                onChangeText={(q_ans3) => this.setState({q_ans3})}/>
            </View>
            </View>

            <View style={styles.numbercontainer}>
            <Text style={{marginTop:20, fontSize:16}}>Question 4: Do you have any Recent Travel History?</Text>
            </View>
            <View style={styles.numbercontainer}>
            <View style={styles.Numberinput}>
            <TextInput 
                placeholder="Answer"
                style={styles.numbertxt}
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
            <Button style={{ marginBottom:20, backgroundColor:'#199CA6' }} onPress={() => this.submitAnswer()}  full><Text style={styles.footercontainer_hafeez1}>Submit</Text></Button>
            </View>
            </View>

        </ScrollView>
        );
    };


    renderBody() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigation={this.props.navigation} />}
                onClose={() => this.closeDrawer()} >
                <View style={styles.container}>



                    {this.state.email === 'admin@gmail.com' ? (this.adminView_renderBody()) : (this.userView_renderBody())}


                    <View style={styles.menubuttoncontainer}>
                        <TouchableOpacity onPress={() => this.openDrawer()}>
                            <View style={styles.menucontainer}>
                                <Image source={require('../../images/menu.png')} style={{ width: 15, height: 15, }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </Drawer>
        );
    }

}
Drawer.defaultProps.styles.mainOverlay.elevation = 0;
