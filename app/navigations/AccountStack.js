import { createStackNavigator } from "react-navigation-stack";
import AccountScreen from "../screens/Accounts/Account";
import SignupUserScreen from "../screens/Accounts/SignupUser";
import LoginUserScreen from "../screens/Accounts/LoginUser";

const AccountScreenStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: () => ({
      title: "Account"
    })
  },
  SignupUser: {
    screen: SignupUserScreen,
    navigationOptions: () => ({
      title: "Signup"
    })
  },
  LoginUser: {
    screen: LoginUserScreen,
    navigationOptions: () => ({
      title: "Login"
    })
  }
});

export default AccountScreenStack;
