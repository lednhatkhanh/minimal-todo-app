import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Button, Icon } from "native-base";

const styles = StyleSheet.create({
  container: { position: "absolute", right: 40, bottom: 40 },
});

export const FloatButton = ({ onPress }) => (
  <Button style={styles.container} onPress={onPress}>
    <Icon name="add" />
  </Button>
);

FloatButton.propTypes = {
  onPress: PropTypes.func,
};

FloatButton.defaultProps = {
  onPress: undefined,
};
