import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ListItem, Button, Text, Icon, Left, Body, Input } from "native-base";

import { GetTaskQueryDocument } from "~/components/get-task-query";

export const AddStepMutationDocument = gql`
  mutation addStep($taskId: ID!, $title: String!, $completed: Boolean!) {
    addStep(taskId: $taskId, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

export class AddStep extends React.PureComponent {
  static propTypes = {
    taskId: PropTypes.string.isRequired,
  };

  state = {
    addingStep: false,
    stepData: {
      title: "",
      completed: false,
    },
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
    const { taskId } = this.props;
    const { addingStep, stepData } = this.state;

    return (
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
    );
  }
}
