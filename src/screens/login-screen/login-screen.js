import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { withApollo } from "react-apollo";

import { LoginForm } from "~/components/login-form";
import { LoginMutation } from "~/components/login-mutation";

const LoginScreenView = ({ navigation, client }) => (
  <LoginMutation
    onCompleted={async loginData => {
      await AsyncStorage.setItem("token", loginData.login.token);
      await client.resetStore();
      navigation.navigate("Home");
    }}
  >
    {loginMutation => (
      <LoginForm
        navigation={navigation}
        onSubmit={values => {
          loginMutation({ variables: values });
        }}
      />
    )}
  </LoginMutation>
);

LoginScreenView.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  client: PropTypes.object.isRequired,
};

LoginScreenView.navigationOptions = { header: null };

export const LoginScreen = withApollo(LoginScreenView);
