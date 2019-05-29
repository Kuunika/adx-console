import styled from "styled-components";
import Pusher from "pusher-js/";


const JSONObject = { serviceNow: "preparingData" };

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const ProgressBar = styled.ul`
  counter-reset: step;
  width: 100%;
`;

const ProgressText = styled.p`
  color: #0a122d;
  font-size: 16px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 5px;
  font-style: oblique;
  font-family: "Arial", Arial, Sans-serif;
  font-weight: bold;
`;

class Bar extends React.Component {
  state = {
    messages: []
  };

  // componentDidMount() {
  // }
  
  render() {
    const pusher = new Pusher("cfaf7a3be30a27f2a21f", {
      cluster: "ap2",
      encrypted: true
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", data => {
      this.setState({ messages: [...this.state.messages, data] });
    });
    let InProgress = () => {
      if (this.state.messages.service == "preparingData") {
        return 1;
      } else if (this.state.messages.service == "validateCode") {
        return 2;
      } else if (this.state.messages.service == "migratingData") {
        return 3;
      } else if (this.state.messages.service == "returningFailers") {
        return 4;
      } else if (this.state.messages.service == "sendingEmail") {
        return 5;
      } else if (this.state.messages.service == "Done") {
        return 0;
      }
      console.log(this.state.messages.service);
    };

    const List = styled.li`
      list-style-type: none;
      float: left;
      width: 18%;
      position: relative;
      text-align: center;
      color: white;
      &:before {
        position: relative;
        z-index: 2;
        content: counter(step);
        counter-increment: step;
        width: 50px;
        heigth: 30px;
        line-height: 50px;
        display: block;
        text-align: center;
        margin: 0 auto 10px auto;
        border-radius: 50%;
        background-image: linear-gradient(#565e81, #030304);
        color: white;
      }
      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 20px;
        background-color: #393d4c;
        top: 15px;
        left: -50%;
        z-index: 1;
      }
      &:first-child:after {
        content: none;
      }
      &.active {
        color: white;
      }
      &.active:before {
        background-image: linear-gradient(#b0e84e, #4a9a25);
      }
      &:nth-child(${InProgress}):before {
        background-image: linear-gradient(orange, orange);
      }
      &.active + &:after {
        background-color: #609331;
      }
    `;

    const Stepper = () => {
      if (this.state.messages.service == "preparingData") {
        return (
          <>
            <List key="1" className="">
              Preparing Data
            </List>
            <List key="2" className="">
              Validating Code
            </List>
            <List key="3" className="">
              Migrating Data
            </List>
            <List key="4" className="">
              Returning Failures
            </List>
            <List key="4" className="">
              Sending Email
            </List>
          </>
        );
      } else if (this.state.messages.service == "validateCode") {
        return (
          <>
            <List className="active">Preparing Data</List>
            <List className="">Validating Code</List>
            <List className="">Migrating Data</List>
            <List className="">Returning Failures</List>
            <List className="">Sending Email</List>
          </>
        );
      } else if (this.state.messages.service == "migratingData") {
        return (
          <>
            <List className="active">Preparing Data</List>
            <List className="active">Validating Code</List>
            <List className="">Migrating Data</List>
            <List className="">Returning Failures</List>
            <List className="">Sending Email</List>
          </>
        );
      } else if (this.state.messages.service == "returningFailers") {
        return (
          <>
            <List className="active">Preparing Data</List>
            <List className="active">Validating Code</List>
            <List className="active">Migrating Data</List>
            <List className="">Returning Failures</List>
            <List className="">Sending Email</List>
          </>
        );
      } else if (this.state.messages.service == "sendingEmail") {
        return (
          <>
            <List className="active">Preparing Data</List>
            <List className="active">Validating Code</List>
            <List className="active">Migrating Data</List>
            <List className="active">Returning Failures</List>
            <List className="">Sending Email</List>
          </>
        );
      } else if (this.state.messages.service == "Done") {
        return (
          <>
            <List className="active">Preparing Data</List>
            <List className="active">Validating Code</List>
            <List className="active">Migrating Data</List>
            <List className="active">Returning Failures</List>
            <List className="active">Sending Email</List>
          </>
        );
      }
    };
    return (
      <>
        <Container>
          <ProgressBar>
            <Stepper />
          </ProgressBar>
        </Container>
        <ProgressText>
          Reciving data, saving payload to database...
        </ProgressText>
      </>
    );
  }
}

export default Bar;
