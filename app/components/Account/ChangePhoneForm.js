import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";

// import * as firebase from "firebase";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangePhoneNumber(props) {
  const { phoneNumber, setIsVisibleModal, setReloadData, toastRef } = props;

  const [newPhoneNumber, setNewPhoneNumber] = useState(null);

  const [error, setError] = useState(null);
  const [loadingIsVisible, setLoadingIsVisible] = useState(false);

  //   const updatePhoneNumber = () => {
  //     setError(null);
  //     if (!newPhoneNumber) {
  //       setError("Phone Number has not been change");
  //     } else {
  //       setLoadingIsVisible(true);

  //       const update = {
  //         phoneNumber: newPhoneNumber
  //       };
  //       firebase
  //         .auth()
  //         .currentUser.phoneNumber(update)
  //         .then(() => {
  //           setLoadingIsVisible(false);
  //           setReloadData(true);
  //           toastRef.current.show("Phone Number has been updated");
  //           setIsVisibleModal(false);
  //         })
  //         .catch(() => {
  //           toastRef.current.show("Error updating, Try Again Later!");
  //           setLoadingIsVisible(false);
  //         });
  //     }
  //   };

  //--------------------------------------------------------------------------------------//

  //   const updatePhoneNumber = () => {
  //     setError(null);
  //     if (!newPhoneNumber) {
  //       setError("errooooooor");
  //     } else {
  //       setLoadingIsVisible(true);
  //       db.collection("phone")
  //         .add({
  //           phoneNumber: newPhoneNumber,
  //           user: firebaseApp.auth().currentUser.uid
  //         })
  //         .then(() => {
  //           setLoadingIsVisible(false);
  //           toastRef.current.show("SUCCESSS");
  //           setIsVisibleModal(false);
  //         })
  //         .catch(() => {
  //           setLoadingIsVisible(false);
  //           toastRef.current.show("ERRROOOR");
  //         });
  //     }
  //   };

  const addPhoneNumber = () => {
    console.log(firebase.auth().currentUser.uid);
    console.log(newPhoneNumber);

    if (!newPhoneNumber) {
      toastRef.current.show("Phone Number has not been change");
    } else {
      //   setLoadingIsVisible(true);
      //   const user = firebase.auth().currentUser;
      //   let payload = {
      //     userId: user.uid,
      //     phone: newPhoneNumber
      //   };
      //   db.collection("contacts")
      //     .add(payload)
      //     .then(() => setLoadingIsVisible(false));

      db.collection("cities")
        .doc("LA")
        .set({
          name: "Los Angeles",
          state: "CA",
          country: "USA"
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  };

  return (
    <View>
      <Input
        placeholder="Phone Number"
        defaultValue={newPhoneNumber && newPhoneNumber}
        onChange={elm => setNewPhoneNumber(elm.nativeEvent.text)}
        label="Phone Number:"
        rightIcon={{
          type: "material-community",
          name: "phone-classic",
          color: "#f7882f"
        }}
        errorMessage={error}
      />
      <Button
        title="UPDATE"
        containerStyle={styles.btnCont}
        buttonStyle={styles.btnStyle}
        onPress={addPhoneNumber}
        loading={loadingIsVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnCont: {
    marginTop: 20
  },
  btnStyle: {
    backgroundColor: "#6b7a8f"
  }
});
