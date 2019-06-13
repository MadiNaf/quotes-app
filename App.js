import React, { Component } from "react";
// At the top of your file
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Root } from "native-base";
import HomeScreen from "./src/views/HomeScreen";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  // Later on in your component
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Root>
        <HomeScreen />
      </Root>
    );
  }
}
