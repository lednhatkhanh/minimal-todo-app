import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

export const LoginMutationDocument = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      expiresIn
      issuedAt
    }
  }
`;

export const LoginMutation = ({ children, ...rest }) => (
  <Mutation mutation={LoginMutationDocument} {...rest}>
    {children}
  </Mutation>
);

LoginMutation.propTypes = {
  children: PropTypes.func.isRequired,
};
