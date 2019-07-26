import styled from "styled-components";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { getMigrationData } from "../redux/actions/migration";
import moment from "moment";
import Swal from "sweetalert2";

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

const TimerText = styled.p`
  color: #7ed322;
  font-size: 50px;
`;

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      dataElements: 0,
      migrated: 0,
      failed: 0,
      time: 0,
      display: "00 : 00 : 00",
      isOn: false,
      start: 0,
      now: 0,
      diffrence: 0,
      service: ''
    };

    this.stopTimer = this.stopTimer.bind(this);
  }

  migrationStartTime = props => {
    if (props.length > 0) {
      return props[0].timestamp;
    }
    return Date.now();
  };

  migratedElements = props => {
    for (let oneMigration of props) {
      if (oneMigration.service == "migration" && oneMigration.migrated) {
        this.setState({
          migrated: oneMigration.chunkSize * oneMigration.chunkNumber,
          dataElements: oneMigration.totalElements,
        });
      } else if (oneMigration.service == "email") {
        this.stopTimer();
        Swal.fire({
          title: "Migration completed",
          html: `<p>Data Elements sent for migration: ${
            this.state.dataElements
          }<br>
          Data Elements migrated: ${this.state.migrated} <br>
          Data Elements failed: ${this.state.failed} <br></p>
          <a href="/" style="background-image: linear-gradient(#009933,#33cc33);
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 20px;
          margin-top: 25px;
          margin-bottom: 60px;">OK</a>`,
          showConfirmButton: false
        });
      } else if (oneMigration.service == "failqueue" && oneMigration.migrated) {
        this.setState({
          failed: (this.state.failed -= oneMigration.chunkSize),
          migrated: this.state.migrated + oneMigration.chunkSize,
        });
      } else {
        this.setState({
          failed:
            !oneMigration.migrated && oneMigration.chunkSize
              ? this.state.failed + oneMigration.chunkSize
              : this.state.failed,
        });
      }
    }
  };

  componentDidUpdate(nextProp) {
    if (
      JSON.stringify(nextProp.messages) != JSON.stringify(this.props.messages)
    )
      this.migratedElements(this.props.messages);
  }

  componentDidMount() {
    this.setState({
      isOn: true,
      start: moment(this.props.messages[0].timestamp), //start time from API endpoint
      now: moment(Date.now())
    });
    setInterval(() => {
      const now = moment(Date.now());
      const duration = moment.duration(now.diff(this.state.start));
      const { hours, minutes, seconds } = duration._data;
      this.setState({
        display: `${hours}: ${minutes}: ${seconds}`
      });
    }, 0);
  }

  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }

  render() {
    return (
      <DetailsDiv>
        <List>
          <RightText data-cy="migtaionID">Migration #{this.props.router.query.UUID}</RightText>
          <RightText>OpenLmis Data for April 2019 </RightText>
          <RightText>araruadam@yahoo.co.uk </RightText>
        </List>
        <List2>
          <TimerText>{this.state.display}</TimerText>
        </List2>
        <List3>
          <LeftText>Migration Started 5 October 2019 </LeftText>
          <LeftText>
            {this.state.dataElements}-- Data Elements Sent to be migrated
          </LeftText>
          <LeftText>{this.state.migrated}-- Data Elements Migrated</LeftText>
          <LeftText>{this.state.failed}-- Data Elements Failed</LeftText>
        </List3>
      </DetailsDiv>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.migration.migration
});

export default withRouter(
  connect(
    mapStateToProps,
    { getMigrationData }
  )(Details)
);
