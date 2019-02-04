import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";
import { View, Text, Spinner } from "native-base";

import { TaskItem } from "~/components/task-item/task-item";
import { GetMyTasksQuery } from "~/components/get-my-tasks-query";

function extractTaskKey(task) {
  return task.id;
}

export class TasksList extends React.Component {
  static propTypes = {
    onTaskItemPress: PropTypes.func.isRequired,
  };

  state = {
    refreshing: false,
    loadingMore: false,
    skip: 0,
  };

  renderTaskItem = ({ item }) => {
    const { onTaskItemPress } = this.props;

    return <TaskItem task={item} onPress={onTaskItemPress} />;
  };

  render() {
    const { refreshing, loadingMore, skip } = this.state;

    return (
      <GetMyTasksQuery>
        {({ loading, data, refetch, fetchMore }) => {
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
                renderItem={this.renderTaskItem}
                keyExtractor={extractTaskKey}
                refreshing={refreshing}
                onRefresh={async () => {
                  this.setState({ refreshing: true });
                  await refetch();
                  this.setState({ refreshing: false });
                }}
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                  if (loadingMore) {
                    return;
                  }

                  const newSkip = skip + 20;

                  this.setState({ skip: newSkip, loadingMore: true }, async () => {
                    await fetchMore({
                      variables: {
                        skip: newSkip,
                      },
                      updateQuery(prev, { fetchMoreResult }) {
                        if (!fetchMoreResult) {
                          return prev;
                        }

                        return {
                          ...prev,
                          getMyTasks: [...prev.getMyTasks, ...fetchMoreResult.getMyTasks /* */],
                        };
                      },
                    });

                    this.setState({ loadingMore: false });
                  });
                }}
                ListFooterComponent={
                  loadingMore && (
                    <View>
                      <Spinner />
                    </View>
                  )
                }
              />
            );
          }

          return null;
        }}
      </GetMyTasksQuery>
    );
  }
}
