import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

import Loading from "../Loading";

import * as firebase from "firebase";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";

function SignupForm(props) {
  const { navigation, toastRef } = props;

  const [loadingIsVisible, setLoadingIsVisible] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepPassword, setHideRepPassword] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");

  //----------FIX THE NAVIGATION AFTER SIGNUP----------//

  const signup = async () => {
    setLoadingIsVisible(true);
    if (!email || !password || !passwordRep) {
      toastRef.current.show("You must fill out everything");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("The email is not correct");
      } else {
        if (password !== passwordRep) {
          toastRef.current.show("The passwords must match");
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("Search");
            })
            .catch(error => {
              console.log(error);
              toastRef.current.show(
                "Error creating the account, Try Again Later!"
              );
            });
        }
      }
    }
    setLoadingIsVisible(false);
  };

  return (
    <View style={styles.viewMain}>
      <Input
        placeholder="Email Address"
        containerStyle={styles.input}
        onChange={elm => setEmail(elm.nativeEvent.text)}
        leftIcon={
          <Icon
            type="material-community"
            name="email"
            iconStyle={styles.icon}
          />
        }
      />
      <Input
        placeholder="Password"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hidePassword}
        onChange={elm => setPassword(elm.nativeEvent.text)}
        leftIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "lock" : "lock-open"}
            iconStyle={styles.icon}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Input
        placeholder="Confirm Password"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hideRepPassword}
        onChange={elm => setPasswordRep(elm.nativeEvent.text)}
        leftIcon={
          <Icon
            type="material-community"
            name={hideRepPassword ? "lock" : "lock-open"}
            iconStyle={styles.icon}
            onPress={() => setHideRepPassword(!hideRepPassword)}
          />
        }
      />
      <Button
        title="SIGNUP"
        containerStyle={styles.btnCont}
        buttonStyle={styles.btnStyle}
        onPress={signup}
      />
      <Loading text="Creating Account" isVisible={loadingIsVisible} />
    </View>
  );
}

export default withNavigation(SignupForm);

const styles = StyleSheet.create({
  viewMain: {
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginTop: 10
  },
  icon: {
    color: "#f7882f",
    marginRight: 15
  },
  btnCont: {
    width: "100%",
    marginTop: 20
  },
  btnStyle: {
    backgroundColor: "#6b7a8f"
  }
});
