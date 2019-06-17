import Layout from "../components/Layout";
import MigrationBox from "../components/MigrationBox";
import { connect } from "react-redux";
import { getMigrationData } from "../redux/actions/migration";
import { subscribe, unsubscribe } from "pusher-redux";
import { getChannel } from "pusher-redux";

class Migration extends React.Component {
  // componentDidlMount() {
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
      <Layout>
        <MigrationBox />
      </Layout>
    );
  }
}

export default connect(
  null,
  { getMigrationData }
)(Migration);
