import styled from "styled-components";
import Pusher from "pusher-js/";
import { connect } from "react-redux";

const JSONObject = { serviceNow: "migration" };

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const ProgressBar = styled.ul`
  counter-reset: step;
  width: 100%;
`;

let complete = props => {
  if (props.service == "email") {
    return 4;
  }
};

let InProgress = props => {
  if (props.service == "mediator") {
    return 1;
  } else if (props.service == "validation") {
    return 2;
  } else if (props.service == "migration") {
    return 3;
  } else if (props.service == "failqueue") {
    return 4;
  } else if (props.service == "email") {
    return 0;
  } else {
    return 0;
  }
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
  &:nth-child(${complete}):before {
    background-image: linear-gradient(#b0e84e, #4a9a25);
  }
  &.active + &:after {
    background-color: #609331;
  }
`;

const Stepper = props => {
  if (props.service == "validation") {
    return (
      <>
        <List service={props.service} className="active">
          Preparing Data
        </List>
        <List service={props.service} className="">
          Validating Code
        </List>
        <List service={props.service} className="">
          Migrating Data
        </List>
        <List service={props.service} className="">
          Returning Failures
        </List>
        <List service={props.service} className="">
          Sending Email
        </List>
      </>
    );
  } else if (props.service == "migration") {
    return (
      <>
        <List service={props.service} className="active">
          Preparing Data
        </List>
        <List service={props.service} className="active">
          Validating Code
        </List>
        <List service={props.service} service={props.service} className="">
          Migrating Data
        </List>
        <List service={props.service} service={props.service} className="">
          Returning Failures
        </List>
        <List service={props.service} service={props.service} className="">
          Sending Email
        </List>
      </>
    );
  } else if (props.service == "failqueue") {
    return (
      <>
        <List service={props.service} className="active">
          Preparing Data
        </List>
        <List service={props.service} className="active">
          Validating Code
        </List>
        <List service={props.service} className="active">
          Migrating Data
        </List>
        <List service={props.service} className="">
          Returning Failures
        </List>
        <List service={props.service} className="">
          Sending Email
        </List>
      </>
    );
  } else if (props.service == "email") {
    return (
      <>
        <List service={props.service} className="active">
          Preparing Data
        </List>
        <List service={props.service} className="active">
          Validating Code
        </List>
        <List service={props.service} className="active">
          Migrating Data
        </List>
        <List service={props.service} className="active">
          Rerunning Failures
        </List>
        <List service={props.service} className="active">
          Sending Email
        </List>
      </>
    );
  } else {
    return (
      <>
        <List service={props.service} className="">
          Preparing Data
        </List>
        <List service={props.service} className="">
          Validating Code
        </List>
        <List service={props.service} className="">
          Migrating Data
        </List>
        <List service={props.service} className="">
          Returning Failures
        </List>
        <List service={props.service} className="">
          Sending Email
        </List>
      </>
    );
  }
};

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
  // state = {
  //   messages: {}
  // };

  // componentDidMount() {
  //   const pusher = new Pusher("cfaf7a3be30a27f2a21f", {
  //     cluster: "ap2",
  //     encrypted: true
  //   });
  //   const channel = pusher.subscribe("my-channel");
  //   channel.bind("my-event", data => {
  //     this.setState({ messages: data });
  //   });
  // }

  render() {
    return (
      <>
        <Container>
          <ProgressBar>
            <Stepper
              service={
                this.props.messages.service
                  ? this.props.messages.service
                  : "mediator"
              }
            />
          </ProgressBar>
        </Container>
        <ProgressText>{this.props.messages.message}....</ProgressText>
      </>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.migration.migration
});

export default connect(mapStateToProps)(Bar);
