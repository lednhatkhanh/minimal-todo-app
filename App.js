/* eslint-disable global-require */
import React from "react";
import { Font } from "expo";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default class App extends React.Component {
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!!!</Text>
        <Button>
          <Text>Nice!!</Text>
        </Button>
      </View>
    );
  }
}
