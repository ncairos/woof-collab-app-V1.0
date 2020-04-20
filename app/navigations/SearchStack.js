import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";
import FindDogScreen from "../screens/Search/FindDog";
import FindCenterScreen from "../screens/Search/FindCenter";

const SearchScreenStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Search",
    }),
  },
  FindDog: {
    screen: FindDogScreen,
    navigationOptions: () => ({
      title: "Find by Dog",
    }),
  },
  FindCenter: {
    screen: FindCenterScreen,
    navigationOptions: () => ({
      title: "Find by Center",
    }),
  },
});

export default SearchScreenStack;
