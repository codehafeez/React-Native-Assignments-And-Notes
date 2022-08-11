import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import firebase from './files/firebase';


const registerFunction = () => {
  firebase.auth().createUserWithEmailAndPassword('test@gmail.com', '123456').then(function(res) {
  console.log(res.user.uid);
  alert("Register user uid : "+res.user.uid);
  }, function(error) { alert(error); });
};

const loginFunction = () => {
  firebase.auth().signInWithEmailAndPassword("codehafeez@gmail.com", "123456").then(function(success) {
      alert("Successfull Login");
  }, function(error) { alert(error); });  
};

const logoutFunction = () => {
  firebase.auth().signOut().then(function(success) {
    alert("Successfull Logout"); }, function(error) { alert(error);
  });
};

const resetPassowrdFunction = () => {
  // --> Reset Passowrd Link send to Email <--
  var auth = firebase.auth();
  var emailAddress = "codehafeez@gmail.com";
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    alert("Reset Passowrd Link send to email : "+emailAddress);
  }).catch(function(error) { alert("Error : "+error); }); 
}

const updatePassowrdFunction = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.auth().currentUser.updatePassword('123123').then(function() {
      alert("Success Update Password");
      }).catch(function(err){ alert("Error Update Password : "+err); });
    } 
    else { alert("User not Login"); }
  });
}

const updateEmailFunction = () => {
    firebase.auth().currentUser.updateEmail('hafeez@gmail.com').then(function() {
    alert("Successfully Update Email");
  }).catch(function(err){ alert("Error Update Email : "+err); });     
}

const deleteAccountFunction = () => {
  firebase.auth().currentUser.delete();
  alert('Successfully Account Delete');
}






const readFunction = () => {
  firebase.database().ref('Users').on('value', function(snapshot) 
  {
    snapshot.forEach(function(childSnapshot) 
    {
        var childData = childSnapshot.val();
        alert(childData.name+" = "+childData.address);
    });
  });
};
const insertFunction = () => {

  firebase.database().ref('Users').push({
    name: "test2",
    address: "test2"
  });

    // this.dbRef = firebase.firestore().collection('users');
    // this.dbRef.add({
    //   name: 'Abdul',
    //   address: 'abc_231232',
    // }).then((res) => {
    //   console.log('Result : '+res);
    // })
    // .catch((err) => {
    //   console.error("Error found: ", err);
    // });
};
const updateFunction = () => {
  firebase.database().ref('Users').child("-MhNfr09vYHfqcmCn4kc").update({ 
    name: "new_name", address: "sfsdfsdf"
  });
};
const deleteFunction = () => {
  firebase.database().ref('Users').child("-MhNfr09vYHfqcmCn4kc").remove();
};
export default function App() {

  return (
    <View>
        <View style={{marginTop:50}}>
          <Button onPress={registerFunction} title="Register DB"/>
        </View>
      
        <View style={{marginTop:20}}>
          <Button onPress={loginFunction} title="Login DB"/>
        </View>
      
        <View style={{marginTop:20}}>
          <Button onPress={logoutFunction} title="Logout DB"/>
        </View>
      
        <View style={{marginTop:20}}>
          <Button onPress={resetPassowrdFunction} title="Reset Passowrd"/>
        </View>

        <View style={{marginTop:20}}>
          <Button onPress={updatePassowrdFunction} title="Update Passowrd DB"/>
        </View>

        <View style={{marginTop:20}}>
          <Button onPress={updateEmailFunction} title="Update Email DB"/>
        </View>

        <View style={{marginTop:20}}>
          <Button onPress={deleteAccountFunction} title="Delete Account DB"/>
        </View>




        <View style={{marginTop:20}}>
          <Button onPress={readFunction} title="Read Data DB"/>
        </View>
      
        <View style={{marginTop:20}}>
          <Button onPress={insertFunction} title="Insert Data DB"/>
        </View>
      
        <View style={{marginTop:20}}>
          <Button onPress={updateFunction} title="Update Data DB"/>
        </View>
      
        <View style={{marginTop:20}}>
          <Button onPress={deleteFunction} title="Delete Data DB"/>
        </View>
    </View>
  );
}
