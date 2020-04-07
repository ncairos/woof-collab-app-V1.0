import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";

import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Reauthenticate";

export default function ChangeEmailForm(props) {
  const { email, setIsVisibleModal, setReloadData, toastRef } = props;

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loadingIsVisible, setLoadingIsVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const updateEmail = () => {
    setError({});
    if (!newEmail || email === newEmail) {
      setError({ email: "Email has not been change" });
    } else {
      setLoadingIsVisible(true);
      reauthenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              setLoadingIsVisible(false);
              setReloadData(true);
              toastRef.current.show("Email has been updated");
              setIsVisibleModal(false);
            })
            .catch(() => {
              toastRef.current.show("Error updating, Try Again Later!");
              setLoadingIsVisible(false);
            });
        })
        .catch(() => {
          setError({ password: "Password is not correct" });
          setLoadingIsVisible(false);
        });
    }
  };

  return (
    <View>
      <Input
        placeholder="Email Address"
        defaultValue={email && email}
        onChange={elm => setNewEmail(elm.nativeEvent.text)}
        label="Email Address:"
        errorMessage={error.email}
        rightIcon={{
          type: "material-community",
          name: "email",
          color: "#f7882f"
        }}
      />
      <Input
        placeholder="Password"
        containerStyle={{ marginTop: 10 }}
        password={true}
        secureTextEntry={hidePassword}
        onChange={elm => setPassword(elm.nativeEvent.text)}
        label="Password:"
        errorMessage={error.password}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "lock" : "lock-open",
          color: "#f7882f",
          onPress: () => setHidePassword(!hidePassword)
        }}
      />
      <Button
        title="UPDATE"
        containerStyle={styles.btnCont}
        buttonStyle={styles.btnStyle}
        onPress={updateEmail}
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
