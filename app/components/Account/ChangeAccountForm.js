import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, CheckBox, Input, Icon, Avatar } from "react-native-elements";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import Modal from "../Modal";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ChangeAccountForm(props) {
  const { setIsVisibleModal, setReloadData, toastRef } = props;

  const [loadingIsVisible, setLoadingIsVisible] = useState(false);
  const [mapIsVisible, setMapIsVisible] = useState(false);
  const [error, setError] = useState({});

  const [centerRole, setCenterRole] = useState(false);
  const [centerLocation, setCenterLocation] = useState(null);

  const [centerName, setCenterName] = useState(" ");
  const [centerAddress, setCenterAddress] = useState(" ");
  const [centerWebpage, setCenterWebpage] = useState(" ");
  const [centerPhone, setCenterPhone] = useState(" ");
  const [centerDescription, setCenterDescription] = useState("");

  const [selectedImg, setSelectedImg] = useState([]);

  const addCenter = () => {
    setError({});
    if (!centerRole) {
      toastRef.current.show("Center account is not checked");
    } else if (
      !centerName ||
      !centerAddress ||
      !centerWebpage ||
      !centerPhone ||
      !centerDescription
    ) {
      setError({
        centerName: "This field cannot be empty",
        centerAddress: "This field cannot be empty",
        centerWebpage: "This field cannot be empty",
        centerPhone: "This field cannot be empty",
        centerDescription: "This field cannot be empty",
      });
    } else if (selectedImg.length === 0) {
      toastRef.current.show("You need to add at least one picture");
    } else if (!centerLocation) {
      toastRef.current.show("You need to add a location");
    } else {
      setLoadingIsVisible(true);
      uploadImage(selectedImg).then((imgArray) => {
        const user = firebase.auth().currentUser;
        db.collection("centers")
          .doc(user.uid)
          .set({
            name: centerName,
            address: centerAddress,
            location: centerLocation,
            webpage: centerWebpage,
            phone: centerPhone,
            description: centerDescription,
            images: imgArray,
            createdAt: new Date(),
          })
          .then(() => {
            setLoadingIsVisible(false);
            toastRef.current.show("Center account has been created");
            setIsVisibleModal(false);
          })
          .catch(() => {
            setLoadingIsVisible(false);
            toastRef.current.show("Error creating account, Try Again Later!");
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
          .ref("center-img")
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
      <View style={{ alignItems: "center" }}>
        <CheckBox
          title="CENTER ACCOUNT"
          checkedIcon={"dot-circle-o"}
          checkedColor="#f7882f"
          uncheckedColor="#c2c2c2"
          uncheckedIcon={"circle-o"}
          textStyle={{ color: centerRole ? "#f7882f" : "#c2c2c2" }}
          checked={centerRole === true}
          onPress={() => setCenterRole(!centerRole)}
          containerStyle={{
            backgroundColor: "transparent",
            borderWidth: 1,
          }}
        />
      </View>
      <Input
        label="Center Name:"
        placeholder="CIAAM"
        containerStyle={{ marginTop: 10 }}
        onChange={(elm) => setCenterName(elm.nativeEvent.text)}
        errorMessage={error.centerName}
        rightIcon={{
          type: "material-community",
          name: "home",
          color: "#f7882f",
        }}
      />
      <Input
        label="Address:"
        placeholder="Street Address"
        containerStyle={{ marginTop: 10 }}
        onChange={(elm) => setCenterAddress(elm.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: centerLocation ? "#f7882f" : "#c2c2c2",
          onPress: () => setMapIsVisible(true),
        }}
        errorMessage={error.centerAddress}
      />
      <Input
        label="Webpage:"
        placeholder="www.example.com"
        containerStyle={{ marginTop: 10 }}
        onChange={(elm) => setCenterWebpage(elm.nativeEvent.text)}
        errorMessage={error.centerWebpage}
        rightIcon={{
          type: "material-community",
          name: "web",
          color: "#f7882f",
        }}
      />
      <Input
        label="Phone Number:"
        placeholder="+34 000-000-000"
        maxLength={9}
        containerStyle={{ marginTop: 10 }}
        onChange={(elm) => setCenterPhone(elm.nativeEvent.text)}
        errorMessage={error.centerPhone}
        rightIcon={{
          type: "material-community",
          name: "phone-classic",
          color: "#f7882f",
        }}
      />
      <Input
        label="Description:"
        placeholder="Max 140 characters"
        containerStyle={{ marginTop: 10 }}
        multiline={true}
        maxLength={140}
        inputContainerStyle={{ height: 100 }}
        onChange={(elm) => setCenterDescription(elm.nativeEvent.text)}
        errorMessage={error.centerDescription}
        rightIcon={{
          type: "material-community",
          name: "note-text",
          color: "#f7882f",
        }}
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
        onPress={addCenter}
        loading={loadingIsVisible}
      />
      <Map
        mapIsVisible={mapIsVisible}
        setMapIsVisible={setMapIsVisible}
        setCenterLocation={setCenterLocation}
        toastRef={toastRef}
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

function Map(props) {
  const { mapIsVisible, setMapIsVisible, setCenterLocation, toastRef } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const responsePermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = responsePermissions.permissions.location.status;
      if (statusPermissions !== "granted") {
        toastRef.current.show("You need to grant permission");
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setCenterLocation(location);
    toastRef.current.show("Center Location saved correctly");
    setMapIsVisible(false);
  };

  return (
    <Modal isVisible={mapIsVisible} setIsVisible={setMapIsVisible}>
      <View>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Button
            title="Save Location"
            containerStyle={{ paddingRight: 10 }}
            buttonStyle={{ backgroundColor: "#f7882f" }}
            onPress={confirmLocation}
          />
          <Button
            title="Cancel Location"
            containerStyle={{ paddingLeft: 10 }}
            buttonStyle={{ backgroundColor: "#6b7a8f" }}
            onPress={() => setMapIsVisible(false)}
          />
        </View>
      </View>
    </Modal>
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
  map: {
    width: "100%",
    height: 500,
  },
});
