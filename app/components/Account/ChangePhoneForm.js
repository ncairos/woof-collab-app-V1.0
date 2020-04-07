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

  const addPhoneNumber = () => {
    setError(null);
    if (!newPhoneNumber) {
      setError("Phone Number has not been change");
    } else {
      setLoadingIsVisible(true);
      const user = firebase.auth().currentUser;
      let payload = {
        userId: user.uid,
        phone: newPhoneNumber,
        createdAt: new Date()
      };
      db.collection("contacts")
        .add(payload)
        .then(() => {
          setLoadingIsVisible(false);
          toastRef.current.show("Phone Number has been updated");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setLoadingIsVisible(false);
          toastRef.current.show("Error updating, Try Again Later!");
        });
    }
  };

  return (
    <View>
      <Input
        placeholder="+00-000-000-000"
        defaultValue={newPhoneNumber && newPhoneNumber}
        onChange={elm => setNewPhoneNumber(elm.nativeEvent.text)}
        keyboardType="numeric"
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
