import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-elements";

import Carousel from "../../components/Carousel";

import * as firebase from "firebase";

export default function DetailsCenter(props) {
  const { centerInfo } = props;
  const [centerImg, setCenterImg] = useState([]);

  useEffect(() => {
    const arrayImg = [];
    (async () => {
      await Promise.all(
        centerInfo.images.map(async (imgID) => {
          await firebase
            .storage()
            .ref(`center-img/${imgID}`)
            .getDownloadURL()
            .then((result) => arrayImg.push(result));
        })
      );
      setCenterImg(arrayImg);
    })();
  }, []);

  return (
    <Card style={{ height: "auto" }} containerStyle={{ borderRadius: 15 }}>
      <View style={styles.viewBox1}>
        <Text style={styles.titleText}>ABOUT US</Text>

        <Text style={styles.textArea}>{centerInfo.description}</Text>
        <Text style={styles.titleText}>¡WE HAVE XX DOGS FOR YOU TO MEET!</Text>
      </View>
      <View style={{ width: "100%" }}>
        <Carousel arrayImg={centerImg} width={350} height={200} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  viewBox1: {
    alignContent: "center",
    justifyContent: "center",
    height: "auto",
    marginBottom: 20,
  },
  titleText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#6b7a8f",
  },
  textArea: {
    textAlign: "center",
    width: "100%",
    marginVertical: 10,
  },
  viewBox2: {
    height: "60%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
