import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { View, Text, Container, Button, Icon, ActionSheet, Content } from "native-base";

import { TasksList } from "~/components/tasks-list/tasks-list";
import { FloatButton } from "~/components/float-button";
import { AppHeader } from "~/components/app-header";

const MenuButtons = ["Logout"];

export class HomeScreenContainer extends React.PureComponent {
  static propTypes = {
    meQueryProps: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    const {
      meQueryProps: { data, error, loading },
      navigation,
    } = this.props;

    if (!loading && (error || !data || (data && !data.me))) {
      navigation.navigate("Login");
    }
  }

  goToAddTaskScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("AddTask");
  };

  render() {
    const {
      meQueryProps: { loading, client, error, data },
      navigation,
    } = this.props;

    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (error || !data || (data && !data.me)) {
      return null;
    }

    return (
      <Container style={{ position: "relative" }}>
        <AppHeader
          title="All Tasks"
          leftButton={
            <Button transparent>
              <Icon name="folder" />
            </Button>
          }
          rightButton={
            <Button
              transparent
              onPress={() => {
                ActionSheet.show(
                  { options: MenuButtons, cancelButtonIndex: 1, title: "Menu" },
                  async buttonIndex => {
                    if (MenuButtons[buttonIndex] === "Logout") {
                      await AsyncStorage.removeItem("token");

                      client.resetStore().then(() => {
                        navigation.navigate("Login");
                      });
                    }
                  },
                );
              }}
            >
              <Icon name="more" />
            </Button>
          }
        />
        <TasksList />
        <FloatButton onPress={this.goToAddTaskScreen} />
      </Container>
    );
  }
}
