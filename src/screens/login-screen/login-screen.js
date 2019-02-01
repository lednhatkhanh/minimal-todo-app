import React from "react";
import PropTypes from "prop-types";

import { LoginForm } from "~/components/login-form";

export const LoginScreen = ({ navigation }) => <LoginForm navigation={navigation} />;

LoginScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

LoginScreen.navigationOptions = { header: null };
