import styled from "styled-components";
import Pusher from "pusher-js/";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import { getMigrationData } from "../redux/actions/migration";

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

let chunk = 0; //2
let migrated = 0; //6

const migratedElements = props => {
  if (props.service == "validation") {
    return migrated;
  } else if (
    props.service == "migration" &&
    props.message == "migrating elements"
  ) {
    chunk++;
    migrated = props.chunkSize * chunk;
    return migrated;
  } else if (props.service == "email") {
    return migrated;
  } else {
    return migrated;
  }
};

let count = 0;

const total = props => {
  if (props.message == "migrating elements") {
    count = props.totalElements;
    return count;
  } else if (props.message == "mediator") {
    return (count = 0);
  } else {
    return count;
  }
};

const failers = props => {
  if (props.service == "failqueue") {
    return count - migrated;
  } else {
    return 0;
  }
};

let secounds = 0;
let minutes = 0;
let hours = 0;


class Details extends React.Component {
  render() {
    return (
      <DetailsDiv>
        <List>
          <RightText>Migration #{this.props.router.query.UUID}</RightText>
          <RightText>OpenLmis Data for April 2019 </RightText>
          <RightText>araruadam@yahoo.co.uk </RightText>
        </List>
        <List2>
          <CenterText>00:00:00</CenterText>
          <LeftText>Elapsed</LeftText>
        </List2>
        <List3>
          <LeftText>Migration Started 5 October 2019 </LeftText>
          <LeftText>
            {total(this.props.messages)}-- Data Elements Sent to be migrated
          </LeftText>
          <LeftText>
            {migratedElements(this.props.messages)}-- Data Elements Migrated
          </LeftText>
          <LeftText>
            {failers(this.props.messages)}-- Data Elements Failed
          </LeftText>
        </List3>
      </DetailsDiv>
    );
  }
}

// Details.propTypes = {
//   messages: PropTypes.array.isRequired
// };

const mapStateToProps = state => ({
  messages: state.migration.migration
});

export default withRouter(
  connect(
    mapStateToProps,
    { getMigrationData }
  )(Details)
);
