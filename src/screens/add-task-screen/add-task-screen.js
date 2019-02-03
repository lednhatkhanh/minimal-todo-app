import React from "react";
import PropTypes from "prop-types";
import { Input, Item, Label, Form, Button, Text, Icon, Container, Content } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

import { ColorPicker } from "~/components/color-picker";
import { AppHeader } from "~/components/app-header";
import { AddTaskMutation } from "~/components/add-task-mutation";

const colors = [
  "#f2a3bd",
  "#d6d963",
  "#6fe7db",
  "#c4adc9",
  "#ed7777",
  "#fad48b",
  "#f5f9ad",
  "#bcdf8a",
  "#94c0cc",
];

export class AddTaskScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    showDueDateTimePicker: false,
    showNotificationTimePicker: false,
    data: {
      title: "",
      due: null,
      color: "#f2a3bd",
      notification: null,
    },
  };

  showDueDateTimePicker = () => {
    this.setState({ showDueDateTimePicker: true });
  };

  showNotificationTimePicker = () => {
    this.setState({ showNotificationTimePicker: true });
  };

  closeDueDateTimePicker = () => {
    this.setState({ showDueDateTimePicker: false });
  };

  closeNotificationTimePicker = () => {
    this.setState({ showNotificationTimePicker: false });
  };

  handleDueTime = date => {
    this.setState(({ data }) => ({
      data: {
        ...data,
        due: date,
      },
    }));
    this.closeDueDateTimePicker();
  };

  handleNotificationTime = date => {
    this.setState(({ data }) => ({
      data: {
        ...data,
        notification: date,
      },
    }));
    this.closeNotificationTimePicker();
  };

  handleColor = color => {
    this.setState(({ data }) => ({
      data: {
        ...data,
        color,
      },
    }));
  };

  goToHomeScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("Home");
  };

  handleTitleChange = value => {
    this.setState(({ data }) => ({ data: { ...data, title: value } }));
  };

  render() {
    const { showDueDateTimePicker, showNotificationTimePicker, data } = this.state;
    const { navigation } = this.props;

    return (
      <AddTaskMutation
        onCompleted={() => {
          navigation.navigate("Home");
        }}
      >
        {addTaskMutation => (
          <Container>
            <AppHeader
              title="Add Task"
              leftButton={
                <Button transparent>
                  <Icon name="arrow-back" onPress={this.goToHomeScreen} />
                </Button>
              }
            />
            <Content>
              <Form>
                <Item stackedLabel>
                  <Label>Title</Label>
                  <Input onChangeText={this.handleTitleChange} />
                </Item>
                <Item style={{ marginTop: 14, borderBottomWidth: 0 }}>
                  <Button onPress={this.showDueDateTimePicker} rounded>
                    {data.due ? (
                      <>
                        <Text>{moment(data.due).format("MMM DD, YYYY hh:mm A")}</Text>
                      </>
                    ) : (
                      <>
                        <Icon name="clock" />
                        <Text>Due Time</Text>
                      </>
                    )}
                  </Button>
                  <DateTimePicker
                    titleIOS="Set due time"
                    mode="datetime"
                    isVisible={showDueDateTimePicker}
                    onConfirm={this.handleDueTime}
                    onCancel={this.closeDueDateTimePicker}
                  />
                </Item>
                <ColorPicker
                  style={{ marginTop: 10 }}
                  colors={colors}
                  activeColor={data.color}
                  onChange={this.handleColor}
                />
                <Item style={{ marginTop: 10, borderBottomWidth: 0 }}>
                  <Button onPress={this.showNotificationTimePicker} rounded>
                    {data.due ? (
                      <>
                        <Text>{moment(data.due).format("MMM DD, YYYY hh:mm A")}</Text>
                      </>
                    ) : (
                      <>
                        <Icon name="notifications" />
                        <Text>Set notification</Text>
                      </>
                    )}
                  </Button>
                  <DateTimePicker
                    titleIOS="Set notification"
                    mode="datetime"
                    isVisible={showNotificationTimePicker}
                    onConfirm={this.handleNotificationTime}
                    onCancel={this.closeNotificationTimePicker}
                  />
                </Item>
                <Item style={{ marginTop: 40, borderBottomWidth: 0 }}>
                  <Button
                    block
                    onPress={() => {
                      const {
                        data: { color, due, notification, title },
                      } = this.state;
                      addTaskMutation({ variables: { title, color, due, notification } });
                    }}
                  >
                    <Icon name="add" />
                    <Text>Add</Text>
                  </Button>
                </Item>
              </Form>
            </Content>
          </Container>
        )}
      </AddTaskMutation>
    );
  }
}
