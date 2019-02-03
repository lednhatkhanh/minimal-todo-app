import React from "react";
import { FlatList } from "react-native";
import { View, Text } from "native-base";

import { TaskItem } from "~/components/task-item/task-item";
import { GetMyTasksQuery } from "~/components/get-my-tasks-query";

function extractTaskKey(task) {
  return task.id;
}

export class TasksList extends React.Component {
  state = {
    refreshing: false,
  };

  render() {
    const { refreshing } = this.state;

    return (
      <GetMyTasksQuery>
        {({ loading, data, refetch }) => {
          if (loading) {
            return (
              <View>
                <Text>Loading...</Text>
              </View>
            );
          }

          if (data && data.getMyTasks) {
            return (
              <FlatList
                data={data.getMyTasks}
                renderItem={({ item }) => <TaskItem task={item} />}
                keyExtractor={extractTaskKey}
                refreshing={refreshing}
                onRefresh={async () => {
                  this.setState({ refreshing: true });
                  await refetch();
                  this.setState({ refreshing: false });
                }}
              />
            );
          }

          return null;
        }}
      </GetMyTasksQuery>
    );
  }
}
