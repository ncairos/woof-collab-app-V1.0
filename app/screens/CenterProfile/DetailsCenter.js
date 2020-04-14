import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-elements";

import Carousel from "../../components/Carousel";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

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
            .then((imgURL) => arrayImg.push(imgURL));
        })
      );
      setCenterImg(arrayImg);
    })();
  }, []);

  return (
    <Card style={{ height: "auto" }}>
      <View style={styles.viewBox1}>
        <Text style={styles.textArea}>{centerInfo.description}</Text>
        <Text style={styles.titleText}>¡WE HAVE XX DOGS FOR YOU TO MEET!</Text>
      </View>
      <View>
        <Carousel arrayImg={centerImg} width={350} height={200} />
      </View>
      {/* <View style={styles.viewBox1}>
        <Text style={styles.textArea} numberOfLines={4}>
          {centerInfo.description}
        </Text>
        <Text style={styles.titleText}>¡WE HAVE XX DOGS FOR YOU TO MEET!</Text>
      </View>
      <View style={styles.viewBox2}>
        <Carousel arrayImg={centerImg} width={350} height={200} />
      </View> */}
    </Card>
  );
}

const styles = StyleSheet.create({
  viewBox1: {
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
    height: "auto",
  },
  titleText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#6b7a8f",
  },
  textArea: {
    textAlign: "center",
    width: "100%",
  },
  viewBox2: {
    height: "60%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
