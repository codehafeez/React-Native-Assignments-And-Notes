import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");



const createTableFunction = () => {
    db.transaction(tx => {
      tx.executeSql("DROP TABLE IF EXISTS table_users");
      tx.executeSql("CREATE TABLE table_users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_address VARCHAR(255))");

      // tx.executeSql(
      //   "CREATE TABLE IF NOT EXISTS table_users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_address VARCHAR(255))"
      // );
    });
};
const readFunction = () => {
    db.transaction((tx) => {
      // tx.executeSql("select * from table_users", [], (_, { rows }) => console.log(JSON.stringify(rows)) ); });
      tx.executeSql(
        'SELECT * FROM table_users',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            console.log('Results', temp);
        }
      );
    });
};
const insertFunction = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO table_users (user_name, user_address) VALUES (?,?)',
        ['Ali', 'test123'],(tx, results) => { console.log('Results', results.rowsAffected); }
      );

    });

};
const updateFunction = () => {
    db.transaction(tx => {
        tx.executeSql(
          'UPDATE table_users set user_name=?, user_address=? where user_id=?',
          ["Noman", "Skz123", 2],
          (tx, results) => { console.log('Results', results.rowsAffected); }
        );
    });
};
const deleteFunction = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_users where user_id=?',
        [2],
        (tx, results) => { console.log('Results', results.rowsAffected); }
      );
    });
};
const searchFunction = () => {
    db.transaction((tx) => {
        tx.executeSql(
        'SELECT * FROM table_users where user_id = ?',
        [2],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            alert("Name : "+res.user_name+"\nAddress : "+res.user_address);
          }
          else { alert('No user found'); }
        });
    });
};

export default function App() {

  return (
    <View>
        <View style={{marginTop:20}}>
          <Button onPress={createTableFunction} title="Create DB Table"/>
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

        <View style={{marginTop:20}}>
          <Button onPress={searchFunction} title="Search Data DB"/>
        </View>
    </View>
  );
}

