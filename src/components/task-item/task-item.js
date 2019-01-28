import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Card, H3, Text, View, Icon } from "native-base";

const styles = StyleSheet.create({
  container: { padding: 16 },
  due: { fontSize: 14, marginTop: 8 },
  notificationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  notificationIcon: { color: "#029635", fontSize: 20, marginRight: 10, display: "flex" },
  notification: { fontSize: 14, color: "#333" },
});

export const TaskItem = ({ task }) => (
  <Card style={{ ...styles.container, backgroundColor: task.color || "#6fe7db" }}>
    <H3>{task.title}</H3>
    <Text style={styles.due}>{task.due}</Text>
    {task.notification && (
      <View style={styles.notificationContainer}>
        <Icon style={styles.notificationIcon} name="notifications" />
        <Text style={styles.notification}>{task.notification}</Text>
      </View>
    )}
  </Card>
);

TaskItem.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    due: PropTypes.string.isRequired,
    notification: PropTypes.string,
  }).isRequired,
};
