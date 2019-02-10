import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

export const AddTaskMutationDocument = gql`
  mutation AddTask($title: String!, $color: String!, $due: DateTime, $notification: DateTime) {
    addTask(title: $title, color: $color, due: $due, notification: $notification) {
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

export const AddTaskMutation = ({ children, ...rest }) => (
  <Mutation mutation={AddTaskMutationDocument} {...rest}>
    {children}
  </Mutation>
);

AddTaskMutation.propTypes = {
  children: PropTypes.func.isRequired,
};
