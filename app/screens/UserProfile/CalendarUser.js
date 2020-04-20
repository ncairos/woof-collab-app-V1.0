import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function CalendarUser() {
  const [selected, setSelected] = useState();

  const onDayPress = (day) => {
    setSelected(day.dateString);
  };

  return (
    <View>
      <Calendar
        style={styles.calendar}
        hideExtraDays
        onDayPress={onDayPress}
        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: "#f7882f",
          },
          "2020-04-17": { marked: true, dotColor: "#6b7a8f" },
        }}
        theme={{
          arrowColor: "#f7882f",
          textMonthFontWeight: "bold",
          todayTextColor: "#f7882f",
          monthTextColor: "#6b7a8f",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
