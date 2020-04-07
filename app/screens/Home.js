import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { firebaseApp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Main() {
  const [loggedUser, setLoggedUser] = useState(false);

  firebase.auth().onAuthStateChanged(user => {
    user ? setLoggedUser(true) : setLoggedUser(false);
  });

  useEffect(() => {
    if (loggedUser) {
      
    }
  })

  // db.collection("contacts")
  //   .get()
  //   .then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       console.log('entraa')
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   })
  //   .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  //   });

  return (
    <View style={styles.mainView}>
      <Text>HOME PAGE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#dcc7aa"
  }
});
