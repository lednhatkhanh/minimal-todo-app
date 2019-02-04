import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

export const GetMyTasksQueryDocument = gql`
  query GetMyTasks($limit: Int, $skip: Int) {
    getMyTasks(limit: $limit, skip: $skip) {
      id
      title
      owner {
        id
      }
      color
      due
      notification
      updatedAt
    }
  }
`;

export const GetMyTasksQuery = ({ children, ...rest }) => (
  <Query query={GetMyTasksQueryDocument} {...rest}>
    {children}
  </Query>
);

GetMyTasksQuery.propTypes = {
  children: PropTypes.func.isRequired,
};
