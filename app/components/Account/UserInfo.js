import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function UserInfo(props) {
  const {
    userInfo: { displayName, email, photoUrl },
    setLoadingIsVisible,
    setReloadData,
    setTextLoading,
    toastRef
  } = props;

  const [loggedUser, setLoggedUser] = useState(false);

  firebase.auth().onAuthStateChanged(user => {
    user ? setLoggedUser(true) : setLoggedUser(false);
  });

  // useEffect(() => {
  //   const userId = firebase.auth().currentUser.uid;
  //   const docRef = db.collection("phone")
  //   console.log(userId);

  //   // docRef
  //   //   .get()
  //   //   .then(function(doc) {
  //   //     if (doc.exists) {
  //   //       console.log("Document data:", doc.data());
  //   //     } else {
  //   //       // doc.data() will be undefined in this case
  //   //       console.log("No such document!");
  //   //     }
  //   //   })
  //   //   .catch(function(error) {
  //   //     console.log("Error getting document:", error);
  //   //   });
  //   docRef
  //     // .where("userId", "==", userId)
  //     .get()
  //     .then(function(doc) {
  //       if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch(function(error) {
  //       console.log("Error getting document:", error);
  //     });
  // }, []);

  return (
    <View style={styles.viewMain}>
      <Avatar
        rounded
        showEditButton
        size="large"
        containerStyle={{ marginRight: 25 }}
        source={{
          uri: "https://api.adorable.io/avatars/285/abott@adorable.png"
        }}
      />
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {displayName ? displayName : "Anonymous"}
        </Text>
        <Text style={{ color: "#6b7a8f" }}>{email}</Text>
        <Text style={{ color: "#6b7a8f" }}>aqui va el telefono</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20
  }
});
