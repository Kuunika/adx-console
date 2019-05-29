import styled from "styled-components";

const JSONObject = { serviceNow: "preparingData" };

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const ProgressBar = styled.ul`
  counter-reset: step;
  width: 100%;
`;

let InProgress = () => {
  if(JSONObject.serviceNow == "preparingData") {
    return 1;
  } else if (JSONObject.serviceNow == "validateCode") {
    return 2;
  } else if (JSONObject.serviceNow == "migratingData") {
    return 3;
  } else if (JSONObject.serviceNow == "returningFailers") {
    return 4;
  } else if (JSONObject.serviceNow == "sendingEmail") {
    return 5;
  } else if (JSONObject.serviceNow == "Done") {
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
  &.active + &:after {
    background-color: #609331;
  }
`;

const Stepper = () => {
  if (JSONObject.serviceNow == "preparingData") {
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
  }
    else if (JSONObject.serviceNow == "validateCode") {
      return (
        <>
        <List className="active">
          Preparing Data
        </List>
        <List className="">
          Validating Code
        </List>
        <List className="">
          Migrating Data
        </List>
        <List className="">
          Returning Failures
        </List>
        <List className="">
          Sending Email
        </List>

      </>
      );
    }
    else if (JSONObject.serviceNow == "migratingData") {
      return (
        <>
        <List className="active">
          Preparing Data
        </List>
        <List className="active">
          Validating Code
        </List>
        <List className="">
          Migrating Data
        </List>
        <List className="">
          Returning Failures
        </List>
        <List className="">
          Sending Email
        </List>

      </>
      );
    }
    else if (JSONObject.serviceNow == "returningFailers") {
      return (
        <>
        <List className="active">
          Preparing Data
        </List>
        <List className="active">
          Validating Code
        </List>
        <List className="active">
          Migrating Data
        </List>
        <List className="">
          Returning Failures
        </List>
        <List className="">
          Sending Email
        </List>

      </>
      );
    }
    else if (JSONObject.serviceNow == "sendingEmail") {
      return (
        <>
        <List className="active">
          Preparing Data
        </List>
        <List className="active">
          Validating Code
        </List>
        <List className="active">
          Migrating Data
        </List>
        <List className="active">
          Returning Failures
        </List>
        <List className="">
          Sending Email
        </List>

      </>
      );
    }
    else if (JSONObject.serviceNow == "Done") {
      return (
        <>
        <List className="active">
          Preparing Data
        </List>
        <List className="active">
          Validating Code
        </List>
        <List className="active">
          Migrating Data
        </List>
        <List className="active">
          Returning Failures
        </List>
        <List className="active">
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

const Bar = () => (
  <>
    <Container>
      <ProgressBar>
        <Stepper/>
      </ProgressBar>
    </Container>
    <ProgressText>Reciving data, saving payload to database...</ProgressText>
  </>
);

export default Bar;
