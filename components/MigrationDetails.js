import styled from "styled-components";
import Pusher from "pusher-js/";
import Timer from "react-compound-timer";
import { withRouter } from "react-router-dom";

const DetailsDiv = styled.div`
  display: flex;
  padding: 30px;
`;

const List = styled.div`
  display: inline-block;
  flex: 1;
`;

const List2 = styled.div`
  display: inline-block;
  flex: 1;
  text-align: center;
`;

const List3 = styled.div`
  flex: 1;
  display: inline-block;
  text-align: right;
`;

const RightText = styled.p`
  color: #ffffff;
  font-size: 25px;
  margin: 3px;
`;

const LeftText = styled.p`
  color: #ffffff;
  font-size: 18px;
  margin: 3px;
`;

const CenterText = styled.p`
  color: #7ed322;
  font-size: 40px;
  margin: 3px;
`;

const migratedElements = props => {
  if (props.service == "preparingData" || props.service == "validateCode") {
    return 0;
  } else if (props.service == "sendingEmail") {
    return props.totalElements;
  } else if (props.service == "migratingData") {
    return props.chunkSize * props.chunkNumber;
  } else {
    return 0;
  }
};

const url = window.location.pathname;
console.log(url);
const splited = url.split("/");
const UUID = splited[splited.length - 1];

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

class Details extends React.Component {
  state = {
    messages: {}
  };

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

  render() {
    return (
      <DetailsDiv>
        <List>
          <RightText>Migration # {UUID}</RightText>
          <RightText>{this.props.messages.DateFor} </RightText>
          <RightText>{this.state.messages.Email} </RightText>
        </List>
        <List2>
          <CenterText>
            <Timer>
              <Timer.Hours />:
              <Timer.Minutes />:
              <Timer.Seconds />
            </Timer>
          </CenterText>
          <LeftText>Elapsed</LeftText>
        </List2>
        <List3>
          <LeftText>Migration Started </LeftText>
          <LeftText>
            {this.state.messages.totalElements}-- Data Elements Sent
          </LeftText>
          <LeftText>
            {migratedElements(this.state.messages)}-- Data Elements Migrated
          </LeftText>
          <LeftText>0 -- Data Elements Failed</LeftText>
        </List3>
      </DetailsDiv>
    );
  }
}

export default Details;
