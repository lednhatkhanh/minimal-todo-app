import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

export const DeleteStepMutationDocument = gql`
  mutation DeleteStep($id: ID!) {
    deleteStep(id: $id) {
      id
    }
  }
`;

export const DeleteStepMutation = ({ children, ...rest }) => (
  <Mutation mutation={DeleteStepMutationDocument} {...rest}>
    {children}
  </Mutation>
);

DeleteStepMutation.propTypes = {
  children: PropTypes.func.isRequired,
};
