import styled from "styled-components";
import Pusher from "pusher-js/";
import { connect } from "react-redux";

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

let stage = ["", "", "", "", ""];
  
const Stepper = props => {
    return (
      <>
        <List service={props.service} className={stage[0]}>
          Preparing Data
        </List>
        <List service={props.service} className={stage[1]}>
          Validating Code
        </List>
        <List service={props.service} className={stage[2]}>
          Migrating Data
        </List>
        <List service={props.service} className={stage[3]}>
          Returning Failures
        </List>
        <List service={props.service} className={stage[4]}>
          Sending Email
        </List>
      </>
    );
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
  componentDidMount() 
    {
      if (this.props.messages.service == "validation") {
        stage.splice(0,1,'active');
      } else if (this.props.messages.service == "migration") {
        stage.splice(1,1,'active');
      } else if (this.props.messages.service == "failqueue") {
        stage.splice(2,1,'active');
      } else if (this.props.messages.service == "email") {
        stage.splice(3,1,'active');
        stage.splice(4,1,'active');
      } else {
        return stage;
      }
    };
  

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
