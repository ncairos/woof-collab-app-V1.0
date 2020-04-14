import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import Toast from "react-native-easy-toast";

import { withNavigation } from "react-navigation";
import Loading from "../components/Loading";

import ProfileMenu from "../components/ProfileMenu";
import GeneralOptions from "../components/Account/GeneralOptions";
import CenterDetails from "../screens/CenterProfile/DetailsCenter";

import { firebaseApp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

function Main(props) {
  const { navigation } = props;

  const [login, setLogin] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [centerInfo, setCenterInfo] = useState({});

  const [reloadData, setReloadData] = useState(false);
  const [renderSettings, setRenderSettings] = useState(false);

  const [renderDetails, setRenderDetails] = useState();
  const [renderDogs, setRenderDogs] = useState();
  const [renderContacts, setRenderContacts] = useState();

  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      firebase.auth().onAuthStateChanged((user) => {
        !user ? setLogin(false) : setLogin(true);
        fetchUser();
        fetchCenter();
      });
    })();
    setReloadData(false);
  }, [reloadData]);
  [];

  const fetchUser = async () => {
    const user = await firebase.auth().currentUser;
    setUserInfo(user.providerData[0]);
  };

  const fetchCenter = async () => {
    const user = await firebase.auth().currentUser.uid;
    await db
      .collection("centers")
      .doc(`${user}`)
      .get()
      .then((doc) => {
        setCenterInfo(doc.data());
      });
  };

  if (login === null) {
    return <Loading isVisible={true} text="Loading..." />;
  }
  return login ? (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Icon
        type="material-icons"
        name="settings"
        color="white"
        size={45}
        containerStyle={styles.toolIcon}
        underlayColor="transparent"
        onPress={() => {
          renderSettings
            ? setRenderSettings(false)
            : (setRenderSettings(true), setRenderDetails(false));
        }}
      />
      <ProfileMenu
        userInfo={userInfo}
        renderDetails={renderDetails}
        setRenderDetails={setRenderDetails}
        renderDogs={renderDogs}
        setRenderDogs={setRenderDogs}
        renderContacts={renderContacts}
        setRenderContacts={setRenderContacts}
        setRenderSettings={setRenderSettings}
      />
      <View>
        {renderSettings && (
          <GeneralOptions
            userInfo={userInfo}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        )}
        {renderDetails && <CenterDetails centerInfo={centerInfo} />}
      </View>
      <Toast ref={toastRef} position="bottom" opacity={0.5} />
    </View>
  ) : (
    <View>
      <Text>NOO TENEMOOS USUARIOO</Text>
    </View>
  );
}

export default withNavigation(Main);

const styles = StyleSheet.create({
  toolIcon: {
    alignItems: "flex-start",
    margin: 10,
    position: "absolute",
    zIndex: 2,
    top: 10,
    right: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
});
