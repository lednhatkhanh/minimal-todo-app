import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  H3,
  ListItem,
  List,
  Left,
  Body,
} from "native-base";
import { AppHeader } from "~/components/app-header";

export class TaskDetailScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  goToHomeScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("Home");
  };

  render() {
    const { navigation } = this.props;
    const task = navigation.getParam("task");

    return (
      <Container>
        <AppHeader
          title="Task Detail"
          leftButton={
            <Button transparent>
              <Icon name="arrow-back" onPress={this.goToHomeScreen} />
            </Button>
          }
        />
        <Content padder>
          <List>
            <ListItem>
              <H3>{task.title}</H3>
            </ListItem>
            <ListItem>
              <Button>
                <Icon name="add" />
                <Text>Add Step</Text>
              </Button>
            </ListItem>
            {task.due && (
              <ListItem icon>
                <Left>
                  <Icon name="add" />
                </Left>
                <Body>{task.due}</Body>
              </ListItem>
            )}
          </List>
        </Content>
      </Container>
    );
  }
}
