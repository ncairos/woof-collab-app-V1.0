import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Avatar } from "react-native-elements";

export default function ProfileMenu(props) {
  const {
    userInfo: { displayName, photoURL },
  } = props;

  return (
    <>
      <ImageBackground
        style={{ resizeMode: "cover" }}
        source={require("../../assets/img/profile-bg.png")}
      >
        <View style={{ height: 200, alignItems: "center" }}>
          <Avatar
            rounded
            size="xlarge"
            containerStyle={{ margin: 10 }}
            source={{
              uri: photoURL
                ? photoURL
                : "https://api.adorable.io/avatars/285/abott@adorable.png",
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#6b7a8f" }}>
            {displayName ? `${displayName}`.toUpperCase() : "ANONYMOUS"}
          </Text>
        </View>
      </ImageBackground>
    </>
  );
}
