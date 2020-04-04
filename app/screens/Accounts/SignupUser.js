import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import Toast from "react-native-easy-toast";

import SignupForm from "../../components/Account/SignupForm";

export default function SignupUser() {
  const toastRef = useRef();
  return (
    <ScrollView style={styles.viewMain}>
      <Image
        source={require("../../../assets/img/dog-collab-logo.png")}
        style={styles.logoImg}
        resizeMode="contain"
      />
      <View style={{ marginTop: 20 }}>
        <SignupForm toastRef={toastRef} />
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
