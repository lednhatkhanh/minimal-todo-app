import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

export const ToggleStepMutationDocument = gql`
  mutation ToggleStep($id: ID!) {
    toggleStep(id: $id) {
      id
      title
      completed
    }
  }
`;

export const ToggleStepMutation = ({ children, ...rest }) => (
  <Mutation mutation={ToggleStepMutationDocument} {...rest}>
    {children}
  </Mutation>
);

ToggleStepMutation.propTypes = {
  children: PropTypes.func.isRequired,
};
