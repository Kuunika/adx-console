import App, { Container } from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import Pusher from "pusher-js/";


const theme = {
  colors: {
    primary: '#0070f3'
  }
}

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps}
  }
  
  constructor(props) {
    super(props);
    this.state = {
      messages: {}
    
    };
  }

  componentDidMount() {
    
    const pusher = new Pusher("cfaf7a3be30a27f2a21f", {
      cluster: "ap2",
      encrypted: true
    });
    const channel = pusher.subscribe("my-channel");
    const url = window.location.pathname;
    const splited = url.split("/");
    const UUID = splited[splited.length - 1];
    channel.bind(UUID, data => {
      this.setState({ messages: data });
    });
  }

  render () {    
    const { Component, pageProps } = this.props
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Component messages={this.state.messages} {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
}
