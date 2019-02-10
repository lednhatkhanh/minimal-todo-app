import { createStackNavigator, createAppContainer } from "react-navigation";

import { HomeScreen } from "~/screens/home-screen";
import { AddTaskScreen } from "~/screens/add-task-screen";
import { LoginScreen } from "~/screens/login-screen";
import { TaskDetailScreen } from "./screens/task-detail-screen";

const AppNavigator = createStackNavigator(
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
    TaskDetail: {
      screen: TaskDetailScreen,
    },
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
  },
);

export const NavigatorContainer = createAppContainer(AppNavigator);
