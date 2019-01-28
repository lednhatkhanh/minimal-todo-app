import React, { Component } from "react";
import { Title, Button, Icon } from "native-base";

import { TasksList } from "~/components/tasks-list/tasks-list";

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
];

export class HomeScreen extends Component {
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

  render() {
    return <TasksList tasks={tasks} />;
  }
}
