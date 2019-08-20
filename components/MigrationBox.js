import styled from "styled-components";
import MigrationDetails from "./MigrationDetails";
import { connect } from "react-redux";

const BlueLine = styled.div`
  background-color: #091b59;
  height: 20px;
`;

const MigrationContainer = styled.div`
  background-color: #9498a2;
  height: 40px;
  width: 1429px;
  margin-top: 0px;
  margin: 0px;
`;

const Bar = styled.div`
  background-image: linear-gradient(#a6c76a, #89bb58);
  height: 40px;
  width: ${props => props.width};
  margin-top: 0px;
  border-radius: 0px;
`;

const BarText = styled.p`
  font-family: "Arial", Arial, Sans-serif;
  font-weight: bold;
  color: #091b58;
  font-size: 16px;
  text-align: center;
  margin-top: -30px;
`;

const Status = styled.h3`
  text-align: center;
  color: #0a122d;
`;

class MigrationBox extends React.Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
      service: ''
    };
  }
  calculateMigrationPercentage = props => {
    for (let oneMigration of props) {
      this.setState({service: oneMigration.message})
      if (
        (oneMigration.service == "migration" && oneMigration.migrated) ||
        (oneMigration.service == "failqueue" && oneMigration.migrated)
      ) {
        let chunk = oneMigration.chunkNumber * oneMigration.chunkSize;
        this.setState({
          percent: Math.round((chunk / oneMigration.totalElements) * 100) + "%"
        });
      }
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
        <div>
          <Status>{this.state.service}....</Status>

        </div>
        <MigrationContainer>
          <Bar width={this.state.percent} />
          <BarText>{this.state.percent} Total Migration</BarText>
        </MigrationContainer>
        <BlueLine/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.migration.migration
});

export default connect(mapStateToProps)(MigrationBox);
