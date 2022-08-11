import React, { Component } from 'react';
import { Alert, TouchableOpacity, Image, StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
export default class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email:'',
      data: [],
    }
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
        const email = await AsyncStorage.getItem('@email');
        this.setState({ email:email });
        this.loadData(email);
      } catch (error) { alert(error); }
};

  loadData = (email) => {
      try {
        this.setState({ data:[] });
        return fetch("https://abidtrader.com/qzdevelopers_demo_projects/fyp_api/load-data.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:email })
      }).then(res => res.json()).then(resJson => {
            resJson.map(item => {
              this.state.data.push({ 
                id:item.q_ans_id,
                status:item.q_ans_status,
                ans1:item.q_ans1,
                ans2:item.q_ans2,
                ans3:item.q_ans3,
                ans4:item.q_ans4,
                submit_date:item.q_ans_date,
                email:email,
              });
            });
            this.setState({ isLoading:false });
        });
      } catch (Ex) { Alert.alert("Error", Ex); }
  };

  viewData = (questionsData) => {
    if(questionsData.status == "Pending" || this.state.email == "admin@gmail.com"){ this.props.navigation.navigate('UserView', { questionsData:questionsData }); }
    else { Alert.alert("Message", "Sorry you can not edit this questions."); }
  };

  renderBody = () => {
    return (
      <View>

        <View style={{marginLeft: 20, marginTop: 45,}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
        <Image style={{width: 20, height: 20}} source={require('../../images/left-arrow.png')} />
        </TouchableOpacity>
        <View style={{marginBottom:10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontFamily: 'lyftpro-bold'}}>History</Text>
        </View>
        </View>

      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const QuestionsAnswer = item.item;
          return(
            <TouchableOpacity onPress={() => this.viewData(QuestionsAnswer)}>
            <View style={styles.container}>
              <View style={styles.content}>

                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>Question 1: Age</Text>
                     <Text style={styles.time}>{QuestionsAnswer.submit_date}</Text>
                     <Text style={styles.time1}>{QuestionsAnswer.status}</Text>
                </View>
                <Text rkType='primary3 mediumLine'>{QuestionsAnswer.ans1}</Text>

                <View style={{marginTop:20}}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>Question 2: Do you have Fever?</Text>
                </View>
                <Text rkType='primary3 mediumLine'>{QuestionsAnswer.ans2}</Text>
                </View>

                <View style={{marginTop:20}}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>Question 3: Do you have Cough/Flu?</Text>
                </View>
                <Text rkType='primary3 mediumLine'>Answer : {QuestionsAnswer.ans3}</Text>
                </View>

                <View style={{marginTop:20}}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>Question 4: Do you have any Recent Travel History?</Text>
                </View>
                <Text rkType='primary3 mediumLine'>Answer : {QuestionsAnswer.ans4}</Text>
                </View>

              </View>
            </View>
            </TouchableOpacity>
          );
        }}/>
      </View>);
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

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#d46f35",
  },
  time1:{
    fontSize:11,
    color:"#4f5dc9",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
}); 
