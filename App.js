/* eslint-disable global-require */
import React from "react";
import { Font } from "expo";

import { AppContainer } from "~/app-container";

export default class App extends React.Component {
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
  }

  render() {
    return <AppContainer />;
  }
}
