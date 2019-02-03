import React from "react";
import PropTypes from "prop-types";
import { Header, Left, Title, Right, Body } from "native-base";

export const AppHeader = ({ rightButton, leftButton, title }) => (
  <Header>
    <Left>{leftButton}</Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right>{rightButton}</Right>
  </Header>
);

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  leftButton: PropTypes.node,
  rightButton: PropTypes.node,
};

AppHeader.defaultProps = {
  leftButton: null,
  rightButton: null,
};
