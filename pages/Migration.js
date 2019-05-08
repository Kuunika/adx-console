import BackgroundColor from "../components/background";
import "../style.css";
import Footer from "../components/footer";
import Logoimage from "../components/image";
import Title from "../components/indexTitle";
import MigrationBox from "../components/MigrationBox";
import ProgressText from "../components/ProgressText";

const Migration = props => (
  <BackgroundColor>
    <Logoimage />
    <Title />
    <MigrationBox />
    <Footer />
  </BackgroundColor>
);

export default Migration;
