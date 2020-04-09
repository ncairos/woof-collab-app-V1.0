import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";

import { firebaseApp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Main() {
  const [loggedUser, setLoggedUser] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setLoggedUser(true) : setLoggedUser(false);
  });

  useEffect(() => {
    if (loggedUser) {
    }
  });

  return (
    <View style={styles.mainView}>
      <Text>HOME PAGE</Text>
      <Input placeholder="Phone" maxLength={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#dcc7aa",
  },
});
