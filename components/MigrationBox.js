import MainDiv from "./mainDiv";
import MigrationBar from "./MigrationBar";
import BlueLine from "./BlueLine";
import MigrationDetails from "./MigrationDetails";
import ProgressBar from "./ProgressBar";
import ProgressText from "../components/ProgressText";

const MigrationBox = () => (
  <MainDiv>
    <MigrationDetails />
    <ProgressBar />
    <ProgressText />
    <MigrationBar />
    <BlueLine />
  </MainDiv>
);

export default MigrationBox;
