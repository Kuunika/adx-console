import styled from "styled-components";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import {
  getMigrationData,
  addHistory
} from "../redux/actions/migration";
import Swal from "sweetalert2";
import * as axios from "axios";

const OrangeLine = styled.div`
  background-color: #ffa200;
  height: 18px;
  width: 100%;
  margin-top: 60px;
`;

const FieldButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchFiled = styled.input`
  margin-top: 100px;
  padding: 25px 25px;
  border-radius: 10px;
  border: 2px solid #929295;
  font-size: medium;
  width: 30%;
`;

const MigrationButton = styled.a`
  background-image: linear-gradient(#fad55f, #f86e1f);
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
  margin-bottom: 60px;
`;

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

class SearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ``,
      messages: {},
      redirect: false,
      isLoaded: false,
      items: [],
      historyCurrent: [],
      metaData: {}
    };
  }

  migrationFinish = () => {
    for (let object of this.props.messages) {
      console.log(object);
      if (object.service === "email") {
        Swal.fire(
          "Migration?",
          "Migration has finished!",
          "info"
        );
      }
    }
  };

  subscribe = async () => {
    const UUID = this.state.search;

    const res = await axios({
      method: "get",
      auth: {
        username: "openlmis",
        password: "openlmis"
      },
      url: `http://142.93.203.254:5001/dhis2/notifications/${UUID}`
    });

    this.props.addHistory(res.data);
    this.migrationFinish();

    console.log(this.props.messages);

    // const metaRes = await axios({
    //   method: "get",
    //   auth: {
    //     username: "openlmis",
    //     password: "openlmis"
    //   },
    //   url: `http://142.93.203.254:5001/dhis2/migration-metadata/${UUID}`
    // });

    // this.props.getMetaData(metaRes.data);
    // this.migrationFinish();

    const pusher = new Pusher("ebd3c5c2a06e092dbcba", {
      cluster: "ap2",
      encrypted: true
    });
    const myChannel = "my-channel";
    const channel = pusher.subscribe(UUID);

    channel.bind("my-event", data => {
      if (!isEmpty(data) && !this.state.redirect) {
        Router.push({ pathname: "/migration", query: { UUID } });
        this.setState({ redirect: true });
      }
      this.props.getMigrationData(data);
    });

    if (this.props.messages.length == 0) {
      Swal.fire(
        "Migration?",
        "The migration you entered does not exist or perhaps the migration is completed so check your email!!!",
        "question"
      );
    }
  };

  updateSearch = event => {
    this.setState({ search: event.target.value });
  };

  Post = () => {
    return (
      <MigrationButton
        data-test="migrationbutton"
        onClick={() => this.subscribe()}
      >
        Track Migration
      </MigrationButton>
    );
  };

  render() {
    return (
      <FieldButtonDiv>
        <SearchFiled
          onChange={e => this.updateSearch(e)}
          value={this.state.search}
          placeholder="Enter Migration ID (Sent as part of migration response)"
        />
        {this.Post()}
        <OrangeLine />
      </FieldButtonDiv>
    );
  }
}
const mapStateToProps = state => ({
  messages: state.migration.migration,
  error: state.migration.error
  // metaData: state.migration.metaData
});

export default withRouter(
  connect(
    mapStateToProps,
  { getMigrationData, addHistory }
  )(SearchBox)
);
