import styled from "styled-components";
import Pusher from "pusher-js/";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import { getMigrationData } from "../redux/actions/migration";
import StopWatch from "./timer";

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


class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      dataElements: 0,
      migrated: 0,
      failed: 0
    };
  }

  migratedElements = props => {
    if (
      props.service == "migration" &&
      props.chunkMigrated
    ) {
      this.setState({
        migrated: props.chunkSize * props.chunkNumber,
        dataElements: props.totalElements
      });
    } else if (props.service == 'failqueue' && props.chunkMigrated) {
      this.setState({
        failed: this.state.failed -= props.chunkSize,
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
  render() {
    return (
      <DetailsDiv>
        <List>
          <RightText>Migration #{this.props.router.query.UUID}</RightText>
          <RightText>OpenLmis Data for April 2019 </RightText>
          <RightText>araruadam@yahoo.co.uk </RightText>
        </List>
        <List2>
          <StopWatch/>
          <LeftText>Elapsed</LeftText>
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
