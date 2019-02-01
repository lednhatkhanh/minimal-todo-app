import React from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet } from "react-native";

import { TaskItem } from "~/components/task-item/task-item";

const styles = StyleSheet.create({ container: { flex: 1 } });

export const TasksList = ({ tasks }) => (
  <ScrollView style={styles.container}>
    {tasks.map(task => {
      return <TaskItem key={task.id} task={task} />;
    })}
  </ScrollView>
);

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      due: PropTypes.string.isRequired,
      notification: PropTypes.string,
    }),
  ),
};

TasksList.defaultProps = {
  tasks: [],
};
