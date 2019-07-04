import styled from "styled-components";
import MigrationDetails from "./MigrationDetails";
import ProgressBar from "./ProgressBar";
import Pusher from "pusher-js/";
import { connect } from "react-redux";

const MigrationContainer = styled.div`
  background-color: #9498a2;
  height: 40px;
  width: 1350px;
  margin-top: 0px;
  margin: auto;
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
  width: 1350px;
  margin-top: 0px;
  margin: auto;
`;

class MigrationBox extends React.Component {
  constructor() {
    super();
    this.state = {
      percent: 0
    };
  }
  calculateMigrationPercentage = props => {
    if (props.service == "migration" && props.chunkMigrated || props.service == "failqueue" && props.chunkMigrated) {
      let chunk = props.chunkNumber * props.chunkSize;
      this.setState({ percent: (chunk / props.totalElements) * 100 + "%" });
    }
  };

  componentDidUpdate(nextProp) {
    if (
      JSON.stringify(nextProp.messages) != JSON.stringify(this.props.messages)
    )
      this.calculateMigrationPercentage(this.props.messages);
  }

  render() {
    return (
      <>
        <MigrationDetails />
        <MigrationContainer>
          <Bar width={this.state.percent} />
          <BarText>{this.state.percent} Total Migration</BarText>
        </MigrationContainer>
        <BlueLine />
      </>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.migration.migration
});

export default connect(mapStateToProps)(MigrationBox);
