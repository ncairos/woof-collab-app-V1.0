import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Image } from "react-native-elements";
import { withNavigation } from "react-navigation";

function Account(props) {
  const { navigation } = props;
  return (
    <View style={styles.viewMain}>
      <Image
        source={require("../../../assets/img/dog-collab-logo.png")}
        style={styles.logoImg}
        resizeMode="contain"
      />
      <Button
        title="LOGIN"
        containerStyle={styles.btnCont}
        buttonStyle={styles.btnStyle}
        onPress={() => navigation.navigate("LoginUser")}
      />
      <Button
        title="SIGNUP"
        containerStyle={styles.btnCont}
        buttonStyle={styles.btnStyle}
        onPress={() => navigation.navigate("SignupUser")}
      />
      <Text
        style={styles.textCenter}
        onPress={() => console.log("center login")}
      >
        ¡Be a part of our woof family!
      </Text>
    </View>
  );
}

export default withNavigation(Account);

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
  },
  btnCont: {
    width: "100%",
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: "#6b7a8f",
  },
  logoImg: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  textCenter: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
