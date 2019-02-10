import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { ListItem, Left, Icon, Body, Text } from "native-base";

const styles = StyleSheet.create({
  completedStep: {
    textDecorationLine: "line-through",
    color: "#ccc",
  },
});

export const StepItem = ({ step, onToggleStep }) => (
  <ListItem key={step.id} icon>
    <Left>
      {step.completed ? (
        <Icon onPress={() => onToggleStep(step.id)} name="checkmark-circle" />
      ) : (
        <Icon onPress={() => onToggleStep(step.id)} name="radio-button-off" />
      )}
    </Left>

    <Body>
      <Text style={step.completed ? styles.completedStep : undefined}>{step.title}</Text>
    </Body>
  </ListItem>
);

StepItem.propTypes = {
  step: PropTypes.object.isRequired,
  onToggleStep: PropTypes.func.isRequired,
};
