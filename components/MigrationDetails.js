import styled from "styled-components";
import Pusher from "pusher-js/";
import { withRouter } from "react-router-dom";
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

// function isEmpty(obj) {
//   for (var key in obj) {
//     if (obj.hasOwnProperty(key)) return false;
//   }
//   return true;
// }

let chunk = 0;//2
let migrated = 0;//6

const migratedElements = props => {
  if (props.service == "validation") {
    return migrated;
  } else if (
    props.service == "migration" &&
    props.message == "migrating elements"
  ) {
    migrated = props.chunkSize * props.chunkNumber;
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
  } else {
    return count;
  }
};

const failers = props => {
  if (props.service == "failqueue"){
    return count - migrated;
  } else {
    return 0;
  }
}

class Details extends React.Component {
  //  componentDidlMount() {
  //   const pusher = new Pusher("cfaf7a3be30a27f2a21f", {
  //     cluster: "ap2",
  //     encrypted: true
  //   });
  //   const channel = pusher.subscribe("my-channel");
  //   const url = window.location.pathname;
  //   const splited = url.split("/");
  //   const UUID = splited[splited.length - 1];
  //   channel.bind(UUID, data => {
  //     this.props.getMigrationData(data);
  //   });
  // }

  render() {
    return (
      <DetailsDiv>
        <List>
          <RightText>Migration #</RightText>
          <RightText>OpenLmis Data for April 2019 </RightText>
          <RightText>araruadam@yahoo.co.uk </RightText>
        </List>
        <List2>
          <CenterText />
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
          <LeftText>{failers(this.props.messages)}-- Data Elements Failed</LeftText>
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

export default connect(
  mapStateToProps,
  { getMigrationData }
)(Details);
