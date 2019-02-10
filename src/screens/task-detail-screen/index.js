import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  H3,
  ListItem,
  List,
  Left,
  Body,
} from "native-base";
import moment from "moment";

import { AppHeader } from "~/components/app-header";

const styles = StyleSheet.create({
  completedStep: {
    textDecorationLine: "line-through",
    color: "#ccc",
  },
});

export class TaskDetailScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  goToHomeScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("Home");
  };

  render() {
    const { navigation } = this.props;
    const task = navigation.getParam("task");

    return (
      <Container>
        <AppHeader
          title="Task Detail"
          leftButton={
            <Button transparent>
              <Icon name="arrow-back" onPress={this.goToHomeScreen} />
            </Button>
          }
        />
        <Content padder>
          <List>
            <ListItem>
              <H3>{task.title}</H3>
            </ListItem>
            {task.due && (
              <ListItem icon>
                <Left>
                  <Icon name="notifications" />
                </Left>
                <Body>
                  <Text>{moment(task.due).format("MMM DD, YYYY hh:mm A")}</Text>
                </Body>
              </ListItem>
            )}
            <ListItem>
              <Button>
                <Icon name="add" />
                <Text>Add Step</Text>
              </Button>
            </ListItem>
            {task.steps &&
              task.steps.map(step => (
                <ListItem key={step.id} icon>
                  <Left>
                    {step.completed ? (
                      <Icon name="checkmark-circle" />
                    ) : (
                      <Icon name="radio-button-off" />
                    )}
                  </Left>
                  <Body>
                    <Text style={step.completed ? styles.completedStep : undefined}>
                      {step.title}
                    </Text>
                  </Body>
                </ListItem>
              ))}
          </List>
        </Content>
      </Container>
    );
  }
}
