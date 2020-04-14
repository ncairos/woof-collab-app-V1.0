import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Avatar } from "react-native-elements";

export default function DogCard(props) {
  const { dogCatalog } = props;

  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar size="large" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.textMain}>Name: {dogCatalog.name} </Text>
          <Text style={styles.textMain}>Sex: {dogCatalog.sex} </Text>
          <Text style={styles.textMain}>Age: {dogCatalog.age} </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  textMain: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f7882f",
    marginBottom: 5,
  },
});
