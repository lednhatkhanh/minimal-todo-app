import { createDrawerNavigator, createAppContainer } from "react-navigation";

import { HomeScreen } from "~/screens/home-screen/home-screen";
import { AddTaskScreen } from "~/screens/add-task-screen/add-task-screen";
import { LoginScreen } from "~/screens/login-screen/login-screen";

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddTask: {
      screen: AddTaskScreen,
    },
    Login: {
      screen: LoginScreen,
    },
  },
  {
    initialRouteName: "Home",
  },
);

export const NavigatorContainer = createAppContainer(AppNavigator);
