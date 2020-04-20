import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function FindCenter() {
  const [centers, setCenters] = useState([]);

  // useEffect(() => {
  //   fetchCenter();
  // }, []);

  // const fetchCenter = () => {
  //   db.collection("centers")
  //     .get()
  //     .then((doc) => {
  //       console.log(doc.size);
  //     });
  // };

  return (
    <View>
      <Text>LISTA DE CENTROS</Text>
    </View>
  );
}
