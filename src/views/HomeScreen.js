import React, { Component } from "react";
import {
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Button,
  Text,
  View,
  Icon
} from "native-base";
import { StyleSheet, Image, ActivityIndicator, NetInfo } from "react-native";
import axios from "axios";

export default class HomeScreen extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      quotes: "press the generate button to generate a new quote",
      author: "",
      generateQuote: false,
      error: false,
      isConnected: true,
      errorMsg: ""
    };
  }
  // GET CONNECTION INFORMATION
  getNetInfo() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type === "none") {
        this.setState({
          isConnected: false
        });
      } else {
        this.setState({
          quotes: "press the generate button to generate a new quote",
          author: "",
          generateQuote: false,
          isConnected: true
        });
      }
    });
  }
  // MOUNTED COMPONENT
  componentWillMount() {
    this.getNetInfo();
  }
  goBack = () => {
    this.setState({
      generateQuote: false,
      isConnected: true,
      error: false
    });
  };
  // GET QUOTES REQUEST
  getQuote = () => {
    this.getNetInfo();
    this.setState({
      generateQuote: true
    });
    axios
      .get("https://favqs.com/api/qotd")
      .then(response => {
        this.setState({
          quotes: response.data.quote.body,
          author: response.data.quote.author,
          generateQuote: false
        });
        return response;
      })
      .catch(error => {
        this.setState({
          generateQuote: false,
          errorMsg: "a problem has occurred !",
          error: true
        });
        console.log("request error", error);
      });
  };
  render() {
    // REQUEST GENERATE QUOTES LOADING
    if (this.state.generateQuote) {
      return (
        <Container style={styles.container}>
          <View style={[styles.loadindContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#ff914d" />
          </View>
        </Container>
      );
    }
    // ERROR GET RESQUEST QUOTES
    if (this.state.error) {
      return (
        <Container style={styles.container}>
          <View style={styles.errorContainer}>
            <Image
              source={require("../../assets/thinking.png")}
              style={styles.creativity}
            />
            <Button block danger style={styles.marginTop}>
              <Text>{this.state.errorMsg}</Text>
            </Button>
            <Button onPress={this.goBack} iconLeft info style={styles.btnBack}>
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
          </View>
        </Container>
      );
    }
    // ERROR USER CONNECTION
    if (!this.state.isConnected) {
      return (
        <Container style={styles.container}>
          <View style={styles.errorContainer}>
            <Image
              source={require("../../assets/thinking.png")}
              style={styles.creativity}
            />
            <Button block danger style={styles.marginTop}>
              <Text>please check your internet connection !</Text>
            </Button>
            <Button onPress={this.goBack} iconLeft info style={styles.btnBack}>
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
          </View>
        </Container>
      );
    }
    // VIEW RESPONSE QUOTES AND TEMPLATE
    return (
      <Container style={styles.container}>
        <View style={styles.margin}>
          <Image
            source={require("../../assets/creativity.png")}
            style={styles.creativity}
          />
        </View>
        <Content style={styles.center}>
          <Card>
            <CardItem header>
              <Text />
            </CardItem>
            <CardItem>
              <Body>
                <Text>" {this.state.quotes} "</Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>{this.state.author}</Text>
            </CardItem>
          </Card>

          <Button
            onPress={this.getQuote}
            block
            success
            style={styles.marginTop}
          >
            <Text>generate</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B2631"
  },
  center: {
    padding: 10
  },
  marginTop: { marginTop: 20 },
  margin: { marginTop: 150 },
  red: {
    color: "red"
  },
  creativity: {
    height: 25,
    width: 100,
    paddingTop: 100,
    marginLeft: 155
  },
  loadindContainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  errorContainer: {
    marginTop: 200
  },
  btnBack: {
    marginTop: 20,
    marginLeft: 150
  }
});
