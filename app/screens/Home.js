import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Input, Card } from "react-native-elements";

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

  // const ScreenHeight = Dimensions.get("window").height;

  return (
    <View style={styles.mainView}>
      <Card>
        <Text>FIND BY CENTER</Text>
      </Card>
      <Card>
        <Text>FIND BY WOOF</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
