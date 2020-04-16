import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, ScrollView } from "react-native";
import { Card, Icon, Image } from "react-native-elements";
import Modal from "../../components/Modal";
import AddDogForm from "./AddDogForm";
import DogCard from "../../components/DogCard";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

import { YellowBox } from "react-native";
import _ from "lodash";
YellowBox.ignoreWarnings(["VirtualizedLists"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("VirtualizedLists") <= -1) {
    _console.warn(message);
  }
};

export default function DogCenter(props) {
  const { toastRef } = props;

  const [dogCatalog, setDogCatalog] = useState([]);
  const [reloadDog, setReloadDog] = useState(false);

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  useEffect(() => {
    (async () => {
      const user = firebase.auth().currentUser.uid;
      db.collection("dogs")
        .where("createdBy", "==", user)
        .get()
        .then((response) => {
          const dogArray = [];
          response.forEach((doc) => {
            let dogID = doc.data();
            dogID.id = doc.id;
            dogArray.push(dogID);
          });
          setDogCatalog(dogArray);
        });
      setReloadDog(false);
    })();
  }, [reloadDog]);

  return (
    <ScrollView>
      <Card containerStyle={{ paddingVertical: 2, borderRadius: 15 }}>
        <Icon
          type="material-community"
          name="plus"
          color="#6b7a8f"
          size={20}
          onPress={() => setIsVisibleModal(true)}
        />
      </Card>
      <Card style={{ height: "auto" }} containerStyle={{ borderRadius: 15 }}>
        {dogCatalog.length == 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../../../assets/img/dog-collab-logo.png")}
              style={{ height: 100, width: 100 }}
              resizeMode="contain"
            />
            <Text style={styles.text}>THIS CENTER DOES NOT HAVE DOGS</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={dogCatalog}
              renderItem={(item) => (
                <DogCard dogCatalog={item} setReloadDog={setReloadDog} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        <Modal
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          toastRef={toastRef}
        >
          <AddDogForm
            toastRef={toastRef}
            setIsVisibleModal={setIsVisibleModal}
            setReloadDog={setReloadDog}
          />
        </Modal>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b7a8f",
    marginTop: 10,
  },
});
