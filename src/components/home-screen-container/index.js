import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import {
  View,
  Text,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  ActionSheet,
  Content,
} from "native-base";

import { TasksList } from "~/components/tasks-list/tasks-list";
import { FloatButton } from "~/components/float-button";

const tasks = [
  { id: "1", title: "To Do", due: "Mar 16 2016, 08:00 PM" },
  {
    id: "2",
    title: "Project List",
    due: "Apr 12, 2017 11:30 PM",
    notification: "Apr 12, 2017 10:00 PM",
    color: "#f2a3bd",
  },
  {
    id: "3",
    title: "Client",
    due: "Apr 12, 2017 11:30 PM",
    color: "#d6d963",
  },
  {
    id: "4",
    title: "Update Presentation",
    due: "Apr 12, 2017 11:30 PM",
    color: "#c4adc9",
  },
  { id: "11", title: "To Do", due: "Mar 16 2016, 08:00 PM" },
  {
    id: "21",
    title: "Project List",
    due: "Apr 12, 2017 11:30 PM",
    notification: "Apr 12, 2017 10:00 PM",
    color: "#f2a3bd",
  },
  {
    id: "31",
    title: "Client",
    due: "Apr 12, 2017 11:30 PM",
    color: "#d6d963",
  },
  {
    id: "41",
    title: "Update Presentation",
    due: "Apr 12, 2017 11:30 PM",
    color: "#c4adc9",
  },
  { id: "12", title: "To Do", due: "Mar 16 2016, 08:00 PM" },
  {
    id: "22",
    title: "Project List",
    due: "Apr 12, 2017 11:30 PM",
    notification: "Apr 12, 2017 10:00 PM",
    color: "#f2a3bd",
  },
  {
    id: "32",
    title: "Client",
    due: "Apr 12, 2017 11:30 PM",
    color: "#d6d963",
  },
  {
    id: "42",
    title: "Update Presentation",
    due: "Apr 12, 2017 11:30 PM",
    color: "#c4adc9",
  },
];

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
      meQueryProps: { loading, client },
      navigation,
    } = this.props;

    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <Container style={{ position: "relative" }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="folder" />
            </Button>
          </Left>
          <Body>
            <Title>All Tasks</Title>
          </Body>
          <Right>
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
          </Right>
        </Header>
        <Content padder>
          <TasksList tasks={tasks} />
        </Content>
        <FloatButton onPress={this.goToAddTaskScreen} />
      </Container>
    );
  }
}
