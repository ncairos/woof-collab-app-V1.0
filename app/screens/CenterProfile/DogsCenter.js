import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import Modal from "../../components/Modal";
import AddDogForm from "./AddDogForm";
import DogCard from "../../components/DogCard";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function DogCenter(props) {
  const { toastRef } = props;

  const [dogCatalog, setDogCatalog] = useState([]);
  const [reloadDog, setReloadDog] = useState(false);

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  useEffect(() => {
    (async () => {
      const dogArray = [];
      const user = firebase.auth().currentUser.uid;
      db.collection("dogs")
        .where("center", "==", user)
        .get()
        .then((response) => {
          response.forEach((doc) => {
            dogArray.push(doc.data());
          });
          setDogCatalog(dogArray);
        });
      setReloadDog(false);
    })();
  }, [reloadDog]);

  return (
    <Card containerStyle={styles.cardCont}>
      <View style={styles.addIcon}>
        <Icon
          type="material-community"
          name="plus-box"
          color="#6b7a8f"
          size={35}
          onPress={() => setIsVisibleModal(true)}
        />
      </View>
      <DogCard dogCatalog={dogCatalog} />
      <Modal
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        toastRef={toastRef}
      >
        <AddDogForm toastRef={toastRef} setIsVisibleModal={setIsVisibleModal} />
      </Modal>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardCont: {
    borderRadius: 10,
    height: "60%",
  },
  viewBox1: {
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
    height: "auto",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#6b7a8f",
  },
  textArea: {
    fontSize: 16,
    textAlign: "center",
    width: "100%",
  },
  addIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
});
