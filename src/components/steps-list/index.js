import React from "react";
import PropTypes from "prop-types";

import { ToggleStepMutation } from "~/components/toggle-step-mutation";
import { GetTaskQueryDocument } from "~/components/get-task-query";
import { StepItem } from "~/components/step-item";
import { DeleteStepMutation } from "~/components/delete-step-mutation";

export const StepsList = ({ steps, taskId }) =>
  steps.map(step => (
    <ToggleStepMutation
      key={step.id}
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
        <DeleteStepMutation
          optimisticResponse={{
            __typename: "Mutation",
            deleteStep: {
              id: step.id,
              __typename: "Step",
            },
          }}
          update={(proxy, { data: { deleteStep } }) => {
            const prevData = proxy.readQuery({
              query: GetTaskQueryDocument,
              variables: {
                id: taskId,
              },
            });

            proxy.writeQuery({
              query: GetTaskQueryDocument,
              variables: {
                id: taskId,
              },
              data: {
                getTask: {
                  ...prevData.getTask,
                  steps: prevData.getTask.steps.filter(
                    filteringStep => filteringStep.id !== deleteStep.id,
                  ),
                },
              },
            });
          }}
        >
          {deleteStepMutation => (
            <StepItem
              step={step}
              onToggle={stepId => toggleStepMutation({ variables: { id: stepId } })}
              onDelete={stepId => deleteStepMutation({ variables: { id: stepId } })}
            />
          )}
        </DeleteStepMutation>
      )}
    </ToggleStepMutation>
  ));

StepsList.propTypes = {
  steps: PropTypes.array.isRequired,
  taskId: PropTypes.string.isRequired,
};
