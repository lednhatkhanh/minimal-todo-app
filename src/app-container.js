import { createStackNavigator, createAppContainer } from "react-navigation";

import { HomeScreen } from "~/screens/home-screen/home-screen";
import { AddTaskScreen } from "~/screens/add-task-screen/add-task-screen";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddTask: {
      screen: AddTaskScreen,
    },
  },
  {
    initialRouteName: "Home",
  },
);

export const AppContainer = createAppContainer(AppNavigator);
