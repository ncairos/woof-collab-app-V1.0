import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import Flag from "react-native-flags";

import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function UserInfo(props) {
  const {
    userInfo: { displayName, email, uid, photoURL },
    phone,
    setLoadingIsVisible,
    setReloadData,
    setTextLoading,
    toastRef,
  } = props;

  //----------PHONE FORMAT----------//
  let str = phone.toString();
  let chuncks = str.replace(/^(\d{3})(\d{3})/, "$1-$2-");

  const avatarChange = async () => {
    const responsePermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const responseCamera = responsePermission.permissions.cameraRoll.status;

    if (responseCamera === "denied") {
      toastRef.current.show("You need to grant permission");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("You have closed the gallery");
      } else {
        uploadImage(result.uri, uid).then(() => {
          uploadPhotoURL(uid);
        });
      }
    }
  };

  const uploadImage = async (uri, imgName) => {
    setTextLoading("Updating avatar");
    setLoadingIsVisible(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`avatar/${imgName}`);
    return ref.put(blob);
  };

  const uploadPhotoURL = (uid) => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
        setLoadingIsVisible(false);
      })
      .catch(() => {
        toastRef.current.show("Error retrieving avatar, Try again later!");
      });
  };

  return (
    <View style={styles.viewMain}>
      <Avatar
        rounded
        showEditButton
        onEditPress={avatarChange}
        size="large"
        containerStyle={{ marginRight: 25 }}
        source={{
          uri: photoURL
            ? photoURL
            : "https://api.adorable.io/avatars/285/abott@adorable.png",
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
