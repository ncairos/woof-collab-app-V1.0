import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Card, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";

function Search(props) {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image
        source={require("../../assets/img/dog-collab-logo.png")}
        style={styles.logImg}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.navigate("FindDog")}>
        <Card containerStyle={styles.card}>
          <Icon
            type="material-community"
            name="dog-side"
            color="#6b7a8f"
            size={45}
          />
          <Text style={styles.textMain}>FIND BY DOG</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("FindCenter")}>
        <Card containerStyle={styles.card}>
          <Icon
            type="material-community"
            name="home"
            color="#6b7a8f"
            size={45}
          />
          <Text style={styles.textMain}>FIND BY CENTER</Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(Search);

const styles = StyleSheet.create({
  logImg: {
    height: 200,
    width: "100%",
    marginBottom: 10,
  },
  card: {
    height: "auto",
    borderRadius: 15,
    justifyContent: "center",
  },
  textMain: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#6b7a8f",
    textAlign: "center",
  },
});
