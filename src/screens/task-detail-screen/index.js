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
  View,
} from "native-base";
import moment from "moment";
import { gql } from "apollo-boost";

import { AppHeader } from "~/components/app-header";
import { Mutation } from "react-apollo";
import { GetTaskQuery, GetTaskQueryDocument } from "~/components/get-task-query";
import { AddStep } from "~/components/add-step";

export const ToggleStepMutationDocument = gql`
  mutation ToggleStep($id: ID!) {
    toggleStep(id: $id) {
      id
      title
      completed
    }
  }
`;

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
                  {task.steps &&
                    task.steps.map(step => (
                      <ListItem key={step.id} icon>
                        <Mutation
                          mutation={ToggleStepMutationDocument}
                          optimisticResponse={{
                            __typename: "Mutation",
                            toggleStep: {
                              ...step,
                              __typename: "Step",
                              completed: !step.completed,
                            },
                          }}
                          update={(proxy, { data: { toggleStep } }) => {
                            const prevData = proxy.readQuery({
                              query: GetTaskQueryDocument,
                              variables: {
                                id: taskId,
                              },
                            });

                            const updatedData = {
                              ...prevData.getTask,
                              steps: prevData.getTask.steps.map(singleStep => {
                                if (singleStep.id === toggleStep.id) {
                                  return {
                                    ...singleStep,
                                    completed: toggleStep.completed,
                                  };
                                }

                                return singleStep;
                              }),
                            };

                            proxy.writeQuery({
                              query: GetTaskQueryDocument,
                              variables: {
                                id: taskId,
                              },
                              data: {
                                getTask: updatedData,
                              },
                            });
                          }}
                        >
                          {toggleStepMutation => (
                            <Left>
                              {step.completed ? (
                                <Icon
                                  onPress={() => toggleStepMutation({ variables: { id: step.id } })}
                                  name="checkmark-circle"
                                />
                              ) : (
                                <Icon
                                  onPress={() => toggleStepMutation({ variables: { id: step.id } })}
                                  name="radio-button-off"
                                />
                              )}
                            </Left>
                          )}
                        </Mutation>
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
        }}
      </GetTaskQuery>
    );
  }
}
