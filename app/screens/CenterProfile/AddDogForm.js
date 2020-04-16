import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Icon, Button, Avatar } from "react-native-elements";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function AddDogForm(props) {
  const { setIsVisibleModal, setReloadDog, toastRef } = props;
  const [error, setError] = useState({});

  const [loadingIsVisible, setLoadingIsVisible] = useState(false);
  const [selectedImg, setSelectedImg] = useState([]);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [personality, setPersonality] = useState("");
  const [about, setAbout] = useState("");

  const addDog = () => {
    setError({});
    if (
      !name ||
      !breed ||
      !sex ||
      !age ||
      !weight ||
      !size ||
      !color ||
      !personality ||
      !about
    ) {
      setError({
        name: "This field cannot be empty",
        breed: "This field cannot be empty",
        sex: "This field cannot be empty",
        age: "This field cannot be empty",
        weight: "This field cannot be empty",
        size: "This field cannot be empty",
        color: "This field cannot be empty",
        personality: "This field cannot be empty",
        about: "This field cannot be empty",
      });
    } else if (selectedImg.length === 0) {
      toastRef.current.show("You need to add at least one picture");
    } else {
      setLoadingIsVisible(true);
      uploadImage(selectedImg).then((imgArray) => {
        const user = firebase.auth().currentUser;
        db.collection("dogs")
          .doc()
          .set({
            name,
            breed,
            sex,
            age,
            weight,
            size,
            color,
            personality,
            about,
            images: imgArray,
            createdBy: user.uid,
            createdAt: new Date(),
          })
          .then(() => {
            setLoadingIsVisible(false);
            setReloadDog(true);
            toastRef.current.show("Dog has been created");
            setIsVisibleModal(false);
          })
          .catch(() => {
            setLoadingIsVisible(false);
            toastRef.current.show("Error creating dog, Try Again Later!");
          });
      });
    }
  };

  const uuidGenerator = () => {
    let dt = new Date().getTime();
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };

  const uploadImage = async (imgArray) => {
    const imgBlob = [];
    await Promise.all(
      imgArray.map(async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = await firebase
          .storage()
          .ref("dog-img")
          .child(uuidGenerator());
        await ref
          .put(blob)
          .then((result) => {
            imgBlob.push(result.metadata.name);
          })
          .catch(() => {
            toastRef.current.show("Error uploading, Try again later!");
          });
      })
    );
    return imgBlob;
  };

  return (
    <View>
      <View style={{ width: "50%", flexDirection: "row" }}>
        <Input
          label="Name:"
          placeholder="bob"
          onChange={(elm) => setName(elm.nativeEvent.text)}
          errorMessage={error.name}
        />
        <Input
          label="Breed:"
          placeholder="poodle"
          onChange={(elm) => setBreed(elm.nativeEvent.text)}
          // containerStyle={{ marginTop: 10 }}
          errorMessage={error.breed}
        />
      </View>
      <View style={{ width: "50%", flexDirection: "row" }}>
        <Input
          label="Sex:"
          placeholder="[male-female]"
          onChange={(elm) => setSex(elm.nativeEvent.text)}
          containerStyle={{ marginTop: 10 }}
          errorMessage={error.sex}
        />
        <Input
          label="Age:"
          placeholder="[two digits]"
          onChange={(elm) => setAge(elm.nativeEvent.text)}
          containerStyle={{ marginTop: 10 }}
          errorMessage={error.age}
        />
      </View>
      <View style={{ width: "50%", flexDirection: "row" }}>
        <Input
          label="Weight:"
          placeholder="[two digits]"
          onChange={(elm) => setWeight(elm.nativeEvent.text)}
          containerStyle={{ marginTop: 10 }}
          errorMessage={error.weight}
        />
        <Input
          label="Size:"
          placeholder="small-medium-large"
          onChange={(elm) => setSize(elm.nativeEvent.text)}
          containerStyle={{ marginTop: 10 }}
          errorMessage={error.size}
        />
      </View>
      <View style={{ width: "50%", flexDirection: "row" }}>
        <Input
          label="Color:"
          placeholder="white & brown"
          onChange={(elm) => setColor(elm.nativeEvent.text)}
          containerStyle={{ marginTop: 10 }}
          errorMessage={error.color}
        />
        <Input
          label="Personality:"
          placeholder="affectionate"
          onChange={(elm) => setPersonality(elm.nativeEvent.text)}
          containerStyle={{ marginTop: 10 }}
          errorMessage={error.personality}
        />
      </View>
      <Input
        label="About:"
        placeholder="Max 140 characters"
        multiline={true}
        maxLength={140}
        inputContainerStyle={{ height: 100 }}
        onChange={(elm) => setAbout(elm.nativeEvent.text)}
        containerStyle={{ marginTop: 10 }}
        errorMessage={error.about}
      />
      <ImgGallery
        selectedImg={selectedImg}
        setSelectedImg={setSelectedImg}
        toastRef={toastRef}
      />
      <Button
        title="UPDATE"
        containerStyle={styles.btnCont}
        buttonStyle={styles.btnStyle}
        onPress={addDog}
        loading={loadingIsVisible}
      />
    </View>
  );
}

function ImgGallery(props) {
  const { selectedImg, setSelectedImg, toastRef } = props;

  const selectImg = async () => {
    const responsePermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const responseCamera = responsePermission.permissions.cameraRoll.status;
    if (responseCamera === "denied") {
      toastRef.current.show("You need to grant permission");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("You have closed the gallery");
      } else {
        setSelectedImg([...selectedImg, result.uri]);
      }
    }
  };

  const removeImg = (image) => {
    const imgArray = selectedImg;

    Alert.alert(
      "Delete Image",
      "¿Are you sure you want to delete it?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () =>
            setSelectedImg(imgArray.filter((imgURL) => imgURL !== image)),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={{ flexDirection: "row" }}>
      {selectedImg.length < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.contIcon}
          onPress={selectImg}
        />
      )}
      {selectedImg.map((centerImg, idx) => (
        <Avatar
          key={idx}
          onPress={() => removeImg(centerImg)}
          style={styles.contImg}
          source={{ uri: centerImg }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  btnCont: {
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: "#6b7a8f",
  },
  contIcon: {
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  contImg: {
    height: 70,
    width: 70,
    marginTop: 20,
    marginLeft: 10,
  },
});
