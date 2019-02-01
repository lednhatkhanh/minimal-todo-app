import React from "react";
import { Input, Item, Label, Form, Button, Text, Icon, View } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

import { ColorPicker } from "~/components/color-picker/color-picker";

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
  static navigationOptions = {
    title: "Add Task",
  };

  state = {
    showDateTimePicker: false,
    data: {
      title: "",
      due: null,
      color: "#f2a3bd",
      notification: null,
    },
  };

  showDateTimePicker = () => {
    this.setState({ showDateTimePicker: true });
  };

  handleDueTime = date => {
    this.setState(({ data }) => ({
      data: {
        ...data,
        due: date,
      },
    }));
    this.closeDateTimePicker();
  };

  closeDateTimePicker = () => {
    this.setState({ showDateTimePicker: false });
  };

  handleColor = color => {
    this.setState(({ data }) => ({
      data: {
        ...data,
        color,
      },
    }));
  };

  render() {
    const { showDateTimePicker, data } = this.state;

    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Form>
          <Item stackedLabel>
            <Label>Title</Label>
            <Input />
          </Item>
          <Item style={{ marginTop: 14, borderBottomWidth: 0 }}>
            <Button onPress={this.showDateTimePicker} rounded>
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
              mode="datetime"
              isVisible={showDateTimePicker}
              onConfirm={this.handleDueTime}
              onCancel={this.closeDateTimePicker}
            />
          </Item>
          <ColorPicker
            style={{ marginTop: 10 }}
            colors={colors}
            activeColor={data.color}
            onChange={this.handleColor}
          />
          <Item style={{ marginTop: 10, borderBottomWidth: 0 }}>
            <Button onPress={this.showDateTimePicker} rounded>
              {data.due ? (
                <>
                  <Text>{moment(data.due).format("MMM DD, YYYY hh:mm A")}</Text>
                </>
              ) : (
                <>
                  <Icon name="notifications" />
                  <Text>Notification</Text>
                </>
              )}
            </Button>
            <DateTimePicker
              mode="datetime"
              isVisible={showDateTimePicker}
              onConfirm={this.handleDueTime}
              onCancel={this.closeDateTimePicker}
            />
          </Item>
          <Item style={{ marginTop: 40, borderBottomWidth: 0 }}>
            <Button block>
              <Icon name="add" />
              <Text>Add</Text>
            </Button>
          </Item>
        </Form>
      </View>
    );
  }
}
