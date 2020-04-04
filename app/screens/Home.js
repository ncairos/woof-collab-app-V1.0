import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Main() {
  return (
    <View style={styles.mainView}>
      <Text>HOME PAGE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#dcc7aa"
  }
});
