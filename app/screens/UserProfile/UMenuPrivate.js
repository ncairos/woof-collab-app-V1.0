import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function UserMenuPrivate(props) {
  const {
    renderDash,
    setRenderDash,
    renderCalendar,
    setRenderCalendar,
    renderChat,
    setRenderChat,
    setRenderSettings,
  } = props;

  return (
    <View style={styles.menuBar}>
      <Text
        style={renderDash ? styles.activeText : styles.disableText}
        onPress={() => {
          setRenderDash(true);
          setRenderCalendar(false);
          setRenderChat(false);
          setRenderSettings(false);
        }}
      >
        DASHBOARD
      </Text>
      <Text
        style={renderCalendar ? styles.activeText : styles.disableText}
        onPress={() => {
          setRenderDash(false);
          setRenderCalendar(true);
          setRenderChat(false);
          setRenderSettings(false);
        }}
      >
        CALENDAR
      </Text>
      <Text
        style={renderChat ? styles.activeText : styles.disableText}
        onPress={() => {
          setRenderDash(false);
          setRenderCalendar(false);
          setRenderChat(true);
          setRenderSettings(false);
        }}
      >
        CHAT
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
