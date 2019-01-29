import React, { Component } from "react";
import PropTypes from "prop-types";
import { Title, Button, Icon, View } from "native-base";

import { TasksList } from "~/components/tasks-list/tasks-list";
import { FloatButton } from "~/components/float-button/float-button";

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

export class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  static navigationOptions = {
    headerLeft: () => (
      <>
        <Button transparent>
          <Icon name="folder" />
          <Title>All</Title>
        </Button>
      </>
    ),
    headerRight: (
      <Button transparent>
        <Icon name="more" />
      </Button>
    ),
  };

  goToAddTaskScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("AddTask");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TasksList tasks={tasks} />
        <FloatButton onPress={this.goToAddTaskScreen} />
      </View>
    );
  }
}
