import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableHighlight, ViewPropTypes } from "react-native";
import { View } from "native-base";

const createStyles = (color, active) =>
  StyleSheet.create({
    item: {
      backgroundColor: color,
      padding: 20,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: active ? "#0A60FF" : "#000",
    },
  });

export class ColorItem extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    active: PropTypes.bool,
    style: PropTypes.objectOf(ViewPropTypes.style),
  };

  static defaultProps = {
    active: false,
    style: {},
  };

  onColorChange = () => {
    const { color, onChange } = this.props;
    onChange(color);
  };

  render() {
    const { color, active, style } = this.props;
    const styles = createStyles(color, active);

    return (
      <TouchableHighlight underlayColor="#fff" key={color} onPress={this.onColorChange}>
        <View style={[styles.item, style]} />
      </TouchableHighlight>
    );
  }
}
