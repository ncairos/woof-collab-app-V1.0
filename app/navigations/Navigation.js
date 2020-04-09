import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import SearchScreenStack from "./SearchStack";
import HomeScreenStack from "./HomeStack";
import AccountScreenStack from "./AccountStack";

const NavigationStack = createBottomTabNavigator(
  {
    Search: {
      screen: SearchScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="magnify"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Home: {
      screen: HomeScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="paw"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Account: {
      screen: AccountScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Account",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Account",
    order: ["Search", "Home", "Account"],
    tabBarOptions: {
      inactiveTintColor: "#6b7a8f",
      activeTintColor: "#f7882f",
    },
  }
);

export default createAppContainer(NavigationStack);
