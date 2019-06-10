import Layout from "../components/Layout";
import MigrationBox from "../components/MigrationBox";

const Migration = props => (
  <Layout>
    <MigrationBox messages={props.messages}/>
  </Layout>
);

export default Migration;
