import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import { ToggleStepMutationDocument } from "~/components/toggle-step-mutation";
import { GetTaskQueryDocument } from "~/components/get-task-query";
import { StepItem } from "~/components/step-item";

export const StepsList = ({ steps, taskId }) =>
  steps.map(step => (
    <Mutation
      key={step.id}
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
        <StepItem
          step={step}
          onToggleStep={stepId => toggleStepMutation({ variables: { id: stepId } })}
        />
      )}
    </Mutation>
  ));

StepsList.propTypes = {
  steps: PropTypes.array.isRequired,
  taskId: PropTypes.string.isRequired,
};
