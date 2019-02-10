import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

export const GetTaskQueryDocument = gql`
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

export const GetTaskQuery = ({ children, ...rest }) => (
  <Query query={GetTaskQueryDocument} {...rest}>
    {children}
  </Query>
);

GetTaskQuery.propTypes = {
  children: PropTypes.func.isRequired,
};
