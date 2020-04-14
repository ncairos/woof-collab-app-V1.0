import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

import ChangeNameForm from "./ChangeNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeAccountForm from "./ChangeAccountForm";
import Modal from "../Modal";

export default function GeneralOptions(props) {
  const { userInfo, setReloadData, toastRef } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComp, setRenderComp] = useState(null);

  const MenuOptions = [
    {
      title: "Full Name",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#f7882f",
      iconNameRight: "chevron-right",
      iconColorRight: "#f7882f",
      onPress: () => selectedComp("displayName"),
    },
    {
      title: "Email",
      iconType: "material-community",
      iconNameLeft: "email",
      iconColorLeft: "#f7882f",
      iconNameRight: "chevron-right",
      iconColorRight: "#f7882f",
      onPress: () => selectedComp("email"),
    },
    {
      title: "Password",
      iconType: "material-community",
      iconNameLeft: "lock",
      iconColorLeft: "#f7882f",
      iconNameRight: "chevron-right",
      iconColorRight: "#f7882f",
      onPress: () => selectedComp("password"),
    },
    {
      title: "Account Settings",
      iconType: "material-icons",
      iconNameLeft: "settings",
      iconColorLeft: "#f7882f",
      iconNameRight: "chevron-right",
      iconColorRight: "#f7882f",
      onPress: () => selectedComp("accountSetting"),
    },
  ];

  const selectedComp = (key) => {
    switch (key) {
      case "displayName":
        setRenderComp(
          <ChangeNameForm
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderComp(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "password":
        setRenderComp(
          <ChangePasswordForm
            password={userInfo.password}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "accountSetting":
        setRenderComp(
          <ChangeAccountForm
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ marginTop: 20, marginHorizontal: 15 }}>
      {MenuOptions.map((elm, idx) => (
        <ListItem
          key={idx}
          title={elm.title}
          leftIcon={{
            type: elm.iconType,
            name: elm.iconNameLeft,
            color: elm.iconColorLeft,
          }}
          rightIcon={{
            type: elm.iconType,
            name: elm.iconNameRight,
            color: elm.iconColorRight,
          }}
          onPress={elm.onPress}
          containerStyle={styles.menuCont}
        />
      ))}
      {renderComp && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComp}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuCont: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
