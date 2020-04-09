import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import Flag from "react-native-flags";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function UserInfo(props) {
  const {
    userInfo: { displayName, email, photoUrl },
    phone,
    setLoadingIsVisible,
    setReloadData,
    setTextLoading,
    toastRef,
  } = props;

  const [loggedUser, setLoggedUser] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setLoggedUser(true) : setLoggedUser(false);
  });

  let str = phone.toString();
  let chuncks = str.replace(/^(\d{3})(\d{3})/, "$1-$2-");
  // console.log(chuncks);

  return (
    <View style={styles.viewMain}>
      <Avatar
        rounded
        showEditButton
        size="large"
        containerStyle={{ marginRight: 25 }}
        source={{
          uri: "https://api.adorable.io/avatars/285/abott@adorable.png",
        }}
      />
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {displayName ? displayName : "Anonymous"}
        </Text>
        <Text style={{ color: "#6b7a8f" }}>{email}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Flag code="ES" size={24} />
          <Text style={{ color: "#6b7a8f" }}> +34 {chuncks}</Text>
        </View>
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
    paddingBottom: 20,
  },
});
