import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Image } from "react-native-elements";
import { withNavigation } from "react-navigation";

import Loading from "../../components/Loading";
import LoggedPage from "./LoggedPage";

import * as firebase from "firebase";

function Account(props) {
  const { navigation } = props;
  const [login, setlogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      !user ? setlogin(false) : setlogin(true);
    });
  }, []);

  if (login === null) {
    return <Loading isVisible={true} text="Loading..." />;
  }
  return login ? (
    <LoggedPage />
  ) : (
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
    justifyContent: "center"
  },
  btnCont: {
    width: "100%",
    marginTop: 20
  },
  btnStyle: {
    backgroundColor: "#6b7a8f"
  },
  logoImg: {
    height: 200,
    width: "100%",
    marginBottom: 20
  },
  textCenter: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16
  }
});
