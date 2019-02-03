import React from "react";
import { AsyncStorage } from "react-native";
import { HttpLink, ApolloClient, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { Root } from "native-base";

import { NavigatorContainer } from "./navigator-container";

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const Main = () => (
  <Root>
    <ApolloProvider client={client}>
      <NavigatorContainer />
    </ApolloProvider>
  </Root>
);
