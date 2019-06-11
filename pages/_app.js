import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import Pusher from "pusher-js/";
import { connect, Provider } from "react-redux";
import { getMigrationData } from "../redux/actions/migration";
import store from "../redux/store";
import { FETCH_MIGRATION } from "../redux/actions/types";

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

// const mapStateToProps = state => ({
//   migration: state.migration.migration
// });
export default MyApp;
