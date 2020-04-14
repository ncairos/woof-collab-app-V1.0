import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";

import * as firebase from "firebase";

export default function ChangeNameForm(props) {
  const { displayName, setIsVisibleModal, setReloadData, toastRef } = props;

  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [loadingIsVisible, setLoadingIsVisible] = useState(false);

  const updateName = () => {
    setError(null);
    if (!newDisplayName) {
      setError("Full Name has not been change");
    } else {
      setLoadingIsVisible(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setLoadingIsVisible(false);
          setReloadData(true);

          toastRef.current.show("Full Name has been updated");
          setIsVisibleModal(false);
        })
        .catch(() => {
          toastRef.current.show("Error updating, Try Again Later!");
          setLoadingIsVisible(false);
        });
    }
  };

  return (
    <View>
      <Input
        placeholder="Full Name"
        defaultValue={displayName && displayName}
        onChange={(elm) => setNewDisplayName(elm.nativeEvent.text)}
        label="Full Name:"
        errorMessage={error}
        rightIcon={{
          type: "material-community",
          name: "account-circle",
          color: "#f7882f",
        }}
      />
      <Button
        title="UPDATE"
        containerStyle={styles.btnCont}
        buttonStyle={styles.btnStyle}
        onPress={updateName}
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
