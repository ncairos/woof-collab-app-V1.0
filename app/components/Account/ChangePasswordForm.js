import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";

import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Reauthenticate";

export default function ChangePassword(props) {
  const { setIsVisibleModal, toastRef } = props;

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideRepPassword, setHideRepPassword] = useState(true);

  const [loadingIsVisible, setLoadingIsVisible] = useState(false);
  const [error, setError] = useState({});

  const updatePassword = () => {
    setError({});
    if (!password || !newPassword || !repPassword) {
      let objError = {};
      !password && (objError.password = "This field cannot be empty");
      !newPassword && (objError.newPassword = "This field cannot be empty");
      !repPassword && (objError.repPassword = "This field cannot be empty");
      setError(objError);
    } else {
      if (newPassword !== repPassword) {
        setError({
          newPassword: "New passwords do not match",
          repPassword: "New passwords do not match"
        });
      } else {
        setLoadingIsVisible(true);
        reauthenticate(password)
          .then(() => {
            firebase
              .auth()
              .currentUser.updatePassword(newPassword)
              .then(() => {
                setLoadingIsVisible(false);
                toastRef.current.show("Password has been updated");
                setIsVisibleModal(false);
                firebase.auth().signOut();
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
    }
  };

  return (
    <View>
      <Input
        label="Actual Password:"
        placeholder="Actual Password"
        password={true}
        secureTextEntry={hidePassword}
        onChange={elm => setPassword(elm.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "lock" : "lock-open",
          color: "#f7882f",
          onPress: () => setHidePassword(!hidePassword)
        }}
        errorMessage={error.password}
      />
      <Input
        label="New Password:"
        placeholder="New Password"
        containerStyle={{ marginTop: 10 }}
        password={true}
        secureTextEntry={hideNewPassword}
        onChange={elm => setNewPassword(elm.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideNewPassword ? "lock" : "lock-open",
          color: "#f7882f",
          onPress: () => setHideNewPassword(!hideNewPassword)
        }}
        errorMessage={error.newPassword}
      />
      <Input
        label="Confirm Password:"
        placeholder="Confirm Password"
        containerStyle={{ marginTop: 10 }}
        password={true}
        secureTextEntry={hideRepPassword}
        onChange={elm => setRepPassword(elm.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideRepPassword ? "lock" : "lock-open",
          color: "#f7882f",
          onPress: () => setHideRepPassword(!hideRepPassword)
        }}
        errorMessage={error.repPassword}
      />
      <Button
        title="UPDATE"
        containerStyle={styles.btnCont}
        buttonStyle={styles.btnStyle}
        onPress={updatePassword}
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
