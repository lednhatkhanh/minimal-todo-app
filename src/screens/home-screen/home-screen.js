import React from "react";
import PropTypes from "prop-types";

import { MeQuery } from "~/components/me-query";
import { HomeScreenContainer } from "~/components/home-screen-container";

export const HomeScreen = ({ navigation }) => (
  <MeQuery>
    {meQueryProps => <HomeScreenContainer meQueryProps={meQueryProps} navigation={navigation} />}
  </MeQuery>
);

HomeScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
