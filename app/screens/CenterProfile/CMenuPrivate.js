import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function CenterMenuPrivate(props) {
  const {
    renderDetails,
    setRenderDetails,
    renderDogs,
    setRenderDogs,
    renderContacts,
    setRenderContacts,
    setRenderSettings,
  } = props;

  return (
    <View style={styles.menuBar}>
      <Text
        style={renderDetails ? styles.activeText : styles.disableText}
        onPress={() => {
          setRenderDetails(true);
          setRenderDogs(false);
          setRenderContacts(false);
          setRenderSettings(false);
        }}
      >
        DASHBOARD
      </Text>
      <Text
        style={renderDogs ? styles.activeText : styles.disableText}
        onPress={() => {
          setRenderDetails(false);
          setRenderDogs(true);
          setRenderContacts(false);
          setRenderSettings(false);
        }}
      >
        CATALOG
      </Text>
      <Text
        style={renderContacts ? styles.activeText : styles.disableText}
        onPress={() => {
          setRenderDetails(false);
          setRenderDogs(false);
          setRenderContacts(true);
          setRenderSettings(false);
        }}
      >
        CONTACT
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#dcc7aa",
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  disableText: {
    fontWeight: "bold",
    color: "white",
  },
  activeText: {
    fontWeight: "bold",
    color: "#6b7a8f",
  },
});
