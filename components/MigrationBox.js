import styled from "styled-components";
import MigrationDetails from "./MigrationDetails";
import ProgressBar from "./ProgressBar";
import Pusher from "pusher-js/";

const MigrationContainer = styled.div`
  background-color: #9498a2;
  height: 40px;
  width: 1440px;
  margin-top: 0px;
`;

const Bar = styled.div`
  background-color: #8cbc5a;
  height: 40px;
  width: ${props => props.width};
  margin-top: 0px;
`;

const BarText = styled.p`
  font-family: "Arial", Arial, Sans-serif;
  font-weight: bold;
  color: #091b58;
  font-size: 16px;
  text-align: center;
  margin-top: -30px;
`;

const BlueLine = styled.div`
  background-color: #091b58;
  height: 20px;
  width: 1440px;
  margin-top: 0px;
`;

const migrationPercentage = props => {
  if (props.service == "migratingData") {
    let chunk = props.totalElements / props.chunkSize;
    return (props.chunkNumber / chunk) * 100 + "%";
  } else if(props.service == "sendingEmail"){
    return 100 + "%";
  } else {
    return 0+"%"
  }
};

class MigrationBox extends React.Component {
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
      <>
      <MigrationDetails />
          <ProgressBar />
          <MigrationContainer>
            <Bar width={migrationPercentage(this.state.messages)} />
            <BarText>
              {migrationPercentage(this.state.messages)} Total Migration
            </BarText>
          </MigrationContainer>
          <BlueLine />
      </>
    );
  }
}

export default MigrationBox;
