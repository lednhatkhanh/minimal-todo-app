import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { ListItem, Left, Icon, Body, Text, ActionSheet } from "native-base";

const styles = StyleSheet.create({
  completedStep: {
    textDecorationLine: "line-through",
    color: "#ccc",
  },
});

export class StepItem extends React.PureComponent {
  static propTypes = {
    step: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  toggleDeleteStep = () => {
    const { onDelete, step } = this.props;

    ActionSheet.show(
      {
        options: ["Delete", "Cancel"],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: "Delete step",
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            onDelete(step.id);
            break;
          default:
            break;
        }
      },
    );
  };

  render() {
    const { step, onToggle } = this.props;

    return (
      <ListItem key={step.id} icon onLongPress={this.toggleDeleteStep}>
        <Left>
          {step.completed ? (
            <Icon onPress={() => onToggle(step.id)} name="checkmark-circle" />
          ) : (
            <Icon onPress={() => onToggle(step.id)} name="radio-button-off" />
          )}
        </Left>

        <Body>
          <Text style={step.completed ? styles.completedStep : undefined}>{step.title}</Text>
        </Body>
      </ListItem>
    );
  }
}
