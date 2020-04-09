import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";

// import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UserInfo from "../../components/Account/UserInfo";
import GeneralOptions from "../../components/Account/GeneralOptions";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function LoggedPage() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [reload, setReload] = useState(false);

  const [loadingIsVisible, setLoadingIsVisible] = useState(false);
  const [textLoading, setTextLoading] = useState("");

  const [phone, setPhone] = useState([]);

  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  useEffect(() => {
    (async () => {
      const userId = firebase.auth().currentUser.uid;
      const phone = [];

      await db
        .collection("contacts")
        .where("userId", "==", userId)
        .get()
        .then((doc) => {
          doc.forEach((doc) => {
            phone.push(doc.data().phone);
          });
        });
      setPhone(phone);
    })();
    setReload(false);
  }, [reload]);

  return (
    <View>
      <UserInfo
        phone={phone}
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setLoadingIsVisible={setLoadingIsVisible}
        setTextLoading={setTextLoading}
      />
      <GeneralOptions
        userInfo={userInfo}
        setReload={setReload}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <View style={styles.viewMain}>
        <Button
          title="LOGOUT"
          containerStyle={styles.btnCont}
          buttonStyle={styles.btnStyle}
          onPress={() => firebase.auth().signOut()}
        />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading text={textLoading} isVisible={loadingIsVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    marginLeft: 40,
    marginRight: 40,
  },
  btnCont: {
    width: "100%",
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: "#6b7a8f",
  },
});
