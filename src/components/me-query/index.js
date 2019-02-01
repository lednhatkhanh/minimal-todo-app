import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

export const MeQueryDocument = gql`
  query MeQuery {
    me {
      email
      name
    }
  }
`;

export const MeQuery = ({ children }) => <Query query={MeQueryDocument}>{children}</Query>;

MeQuery.propTypes = {
  children: PropTypes.func.isRequired,
};
