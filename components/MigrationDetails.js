import styled from "styled-components";
import Pusher from "pusher-js/";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import { getMigrationData } from "../redux/actions/migration";
import Moment from "react-moment";
import moment from "moment";
import ms from "pretty-ms";
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
      display: '00 : 00 : 00',
      isOn: false,
      start: 0,
      counter: 0
    };

    this.stopTimer = this.stopTimer.bind(this);
  }

  migratedElements = props => {
    if (props.service == "migration" && props.chunkMigrated) {
      this.setState({
        migrated: props.chunkSize * props.chunkNumber,
        dataElements: props.totalElements
      });
    } else if (props.service == "email"){
      this.stopTimer();
      Swal.fire( {
        title:'Migration completed',
        html: 
        `<p>Data Elements sent for migration: ${this.state.dataElements} <br>
        Data Elements migrated: ${this.state.migrated} <br>
        Data Elements failed: ${this.state.failed}</p>`,
      }
      );
      Router.push({ pathname: "/" });
    } else if (props.service == "failqueue" && props.chunkMigrated) {
      this.setState({
        failed: (this.state.failed -= props.chunkSize),
        migrated: this.state.migrated + props.chunkSize
      });
    }
    this.setState({
      failed:
        !props.chunkMigrated && props.chunkSize
          ? this.state.failed + props.chunkSize
          : this.state.failed
    });
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
      start: Date.now() - this.state.time
    });
    this.timer = setInterval(
      () =>
        this.setState({
          display: moment(this.state.start).hour(0).minute(0).second(this.state.counter ++).format('HH : mm : ss')
        }),
      1000
    );
  }

  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }

  render() {
    return (
      <DetailsDiv>
        <List>
          <RightText>Migration #{this.props.router.query.UUID}</RightText>
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
