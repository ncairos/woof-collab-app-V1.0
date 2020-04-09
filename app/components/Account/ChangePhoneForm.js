import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";

// import * as firebase from "firebase";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangePhoneNumber(props) {
  const { setIsVisibleModal, setReloadData, toastRef, setReload } = props;

  const [newPhoneNumber, setNewPhoneNumber] = useState(null);

  const [error, setError] = useState(null);
  const [loadingIsVisible, setLoadingIsVisible] = useState(false);

  const addPhoneNumber = () => {
    setError(null);
    if (!newPhoneNumber) {
      setError("Phone Number has not been change");
    } else {
      setLoadingIsVisible(true);
      const user = firebase.auth().currentUser;
      const payload = {
        userId: user.uid,
        phone: newPhoneNumber,
      };
      db.collection("contacts")
        .doc(user.uid)
        .set(payload)
        .then(() => {
          setLoadingIsVisible(false);
          setReloadData(true);
          setReload(true);
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
        placeholder="+34 000-000-000"
        maxLength={9}
        defaultValue={newPhoneNumber && newPhoneNumber}
        onChange={(elm) => setNewPhoneNumber(elm.nativeEvent.text)}
        keyboardType="numeric"
        label="Phone Number:"
        rightIcon={{
          type: "material-community",
          name: "phone-classic",
          color: "#f7882f",
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
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: "#6b7a8f",
  },
});
