import { createStackNavigator, createAppContainer } from "react-navigation";

import { HomeScreen } from "~/screens/home-screen";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: "Home",
  },
);

export const AppContainer = createAppContainer(AppNavigator);
