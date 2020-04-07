import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";

export default function UserInfo(props) {
  const {
    userInfo: { displayName, email, photoUrl, phoneNumber },
    setLoadingIsVisible,
    setReloadData,
    setTextLoading,
    toastRef
  } = props;

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
