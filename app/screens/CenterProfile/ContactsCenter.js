import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Icon } from "react-native-elements";

import Map from "../../components/Map";

export default function ContactsCenter(props) {
  const { address, location, phone, webpage, name } = props.centerInfo;

  let formatPhone = (str) => {
    let cleaned = ("" + str).replace(/\D/g, "");
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return ["+34", " ", match[2], "-", match[3], "-", match[4]].join("");
    }
    return null;
  };

  return (
    <View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ width: "50%" }}>
          <Card containerStyle={{ borderRadius: 15, marginRight: 2.5 }}>
            <Icon
              type="material-community"
              name="web"
              color="#f7882f"
              size={30}
            />
            <Text style={styles.textSubtitle}>{webpage.toLowerCase()}</Text>
          </Card>
        </View>
        <View style={{ width: "50%" }}>
          <Card containerStyle={{ borderRadius: 15, marginLeft: 2.5 }}>
            <Icon
              type="material-community"
              name="phone-classic"
              color="#f7882f"
              size={30}
            />
            <Text style={styles.textSubtitle}>{formatPhone(phone)}</Text>
          </Card>
        </View>
      </View>
      <Card containerStyle={{ borderRadius: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Icon type="font-awesome" name="facebook" color="#6b7a8f" size={30} />
          <Icon type="font-awesome" name="twitter" color="#6b7a8f" size={30} />
          <Icon
            type="font-awesome"
            name="instagram"
            color="#6b7a8f"
            size={30}
          />
          <Icon type="material-icons" name="mail" color="#6b7a8f" size={30} />
        </View>
      </Card>
      <Card containerStyle={{ borderRadius: 15 }}>
        <Text style={styles.textMain}>¡FIND US HERE!</Text>
        <Text style={styles.textSubtitle}>{address}</Text>
        <Map location={location} name={name} height={200} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  textMain: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f7882f",
    marginBottom: 5,
    textAlign: "center",
  },
  textSubtitle: {
    color: "#6b7a8f",
    marginVertical: 5,
    textAlign: "center",
  },
});
