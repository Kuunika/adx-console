import MigrationBar from "./MigrationBar";
import BlueLine from "./BlueLine";
import MigrationDetails from "./MigrationDetails";
import ProgressBar from "./ProgressBar";
import ProgressText from "../components/ProgressText";

const MigrationBox = () => (
  <>
    <MigrationDetails />
    <ProgressBar />
    <ProgressText />
    <MigrationBar />
    <BlueLine />
  </>
);

export default MigrationBox;
