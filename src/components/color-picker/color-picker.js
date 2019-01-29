import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, ViewPropTypes } from "react-native";
import { Item } from "native-base";
import { ColorItem } from "../color-item/color-item";

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  item: {
    margin: 4,
  },
});

export const ColorPicker = ({ colors, activeColor, onChange, style }) => (
  <Item style={[styles.container, style]}>
    {colors.map(color => (
      <ColorItem
        key={color}
        color={color}
        active={color === activeColor}
        style={styles.item}
        onChange={onChange}
      />
    ))}
  </Item>
);

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeColor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.objectOf(ViewPropTypes.style),
};

ColorPicker.defaultProps = {
  style: {},
};
