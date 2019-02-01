/* eslint-disable global-require */
import React from "react";
import { Font } from "expo";
import { StyleSheet } from "react-native";

import { View, Spinner } from "native-base";
import { Main } from "~/";

const styles = StyleSheet.create({
  spinnerContainer: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center" },
});

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;

    return fontLoaded ? (
      <Main />
    ) : (
      <View style={styles.spinnerContainer}>
        <Spinner color="blue" />
      </View>
    );
  }
}
