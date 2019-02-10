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
  Input,
} from "native-base";
import moment from "moment";
import { gql } from "apollo-boost";

import { AppHeader } from "~/components/app-header";
import { Mutation, Query } from "react-apollo";

const ToggleStepMutationDocument = gql`
  mutation ToggleStep($id: ID!) {
    toggleStep(id: $id) {
      id
      title
      completed
    }
  }
`;

const GetTaskQueryDocument = gql`
  query getTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      owner {
        id
      }
      steps {
        id
        title
        completed
      }
      color
      due
      notification
      updatedAt
    }
  }
`;

const AddStepMutationDocument = gql`
  mutation addStep($taskId: ID!, $title: String!, $completed: Boolean!) {
    addStep(taskId: $taskId, title: $title, completed: $completed) {
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

  state = {
    addingStep: false,
    stepData: {
      title: "",
      completed: false,
    },
  };

  goToHomeScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("Home");
  };

  onStartAddingStep = () => {
    this.setState({ addingStep: true });
  };

  onCancelAddingStep = () => {
    this.setState({ addingStep: false });
  };

  onChangeStepTitle = text => {
    this.setState(({ stepData }) => ({
      stepData: {
        ...stepData,
        title: text,
      },
    }));
  };

  toggleStepStatus = () => {
    this.setState(({ stepData }) => ({
      stepData: { ...stepData, completed: !stepData.completed },
    }));
  };

  render() {
    const { navigation } = this.props;
    const taskId = navigation.getParam("taskId");

    const { addingStep, stepData } = this.state;

    return (
      <Query query={GetTaskQueryDocument} variables={{ id: taskId }}>
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
                  <Mutation
                    mutation={AddStepMutationDocument}
                    variables={{
                      taskId,
                      title: stepData.title,
                      completed: stepData.completed,
                    }}
                    update={(proxy, { data: { addStep } }) => {
                      this.setState({
                        addingStep: false,
                        stepData: { title: "", completed: false },
                      });

                      const prevData = proxy.readQuery({
                        query: GetTaskQueryDocument,
                        variables: {
                          id: taskId,
                        },
                      });

                      const updatedData = {
                        ...prevData.getTask,
                        steps: [addStep, ...prevData.getTask.steps],
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
                    {addStepMutation => (
                      <>
                        <ListItem>
                          {(addingStep && (
                            <>
                              <Button
                                disabled={!stepData.title}
                                style={{ marginRight: 10 }}
                                onPress={() => addStepMutation()}
                              >
                                <Text>Done</Text>
                              </Button>
                              <Button dark onPress={this.onCancelAddingStep}>
                                <Text>Cancel</Text>
                              </Button>
                            </>
                          )) || (
                            <Button onPress={this.onStartAddingStep}>
                              <Icon name="add" />
                              <Text>Add Step</Text>
                            </Button>
                          )}
                        </ListItem>
                        {addingStep && (
                          <ListItem icon>
                            <Left>
                              {stepData.completed ? (
                                <Icon onPress={this.toggleStepStatus} name="checkmark-circle" />
                              ) : (
                                <Icon onPress={this.toggleStepStatus} name="radio-button-off" />
                              )}
                            </Left>
                            <Body>
                              <Input
                                value={stepData.title}
                                placeholder="Enter step title here"
                                onChangeText={this.onChangeStepTitle}
                              />
                            </Body>
                          </ListItem>
                        )}
                      </>
                    )}
                  </Mutation>
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
      </Query>
    );
  }
}
