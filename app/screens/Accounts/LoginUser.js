import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import Toast from "react-native-easy-toast";

import LoginForm from "../../components/Account/LoginForm";

export default function LoginUser() {
  const toastRef = useRef();

  return (
    <ScrollView style={styles.viewMain}>
      <Image
        source={require("../../../assets/img/dog-collab-logo.png")}
        style={styles.logoImg}
        resizeMode="contain"
      />
      <View style={{ marginTop: 20 }}>
        <LoginForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  logoImg: {
    height: 100,
    width: "100%",
    marginTop: 20,
    marginBottom: 10
  }
});
