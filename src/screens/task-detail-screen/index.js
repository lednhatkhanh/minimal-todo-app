import React from "react";
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
  View,
} from "native-base";
import moment from "moment";

import { AppHeader } from "~/components/app-header";
import { GetTaskQuery } from "~/components/get-task-query";
import { AddStep } from "~/components/add-step";
import { StepsList } from "~/components/steps-list";

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
    const taskId = navigation.getParam("taskId");

    return (
      <GetTaskQuery variables={{ id: taskId }}>
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <View>
                <Text>Loading...</Text>
              </View>
            );
          }

          if (error) {
            return (
              <View>
                <Text>Error</Text>
              </View>
            );
          }

          const task = data.getTask;

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
                  <AddStep taskId={taskId} />
                  <StepsList steps={task.steps} taskId={task.id} />
                </List>
              </Content>
            </Container>
          );
        }}
      </GetTaskQuery>
    );
  }
}
