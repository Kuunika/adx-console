import styled from "styled-components";
import MigrationDetails from "./MigrationDetails";
import ProgressBar from "./ProgressBar";

const MigrationContainer = styled.div`
  background-color: #9498a2;
  height: 40px;
  width: 1440px;
  margin-top: 0px;
`;

const Bar = styled.div`
  background-color: #8cbc5a;
  height: 40px;
  width: ${props => props.width};
  margin-top: 0px;
`;

const BarText = styled.p`
  font-family: "Arial", Arial, Sans-serif;
  font-weight: bold;
  color: #091b58;
  font-size: 16px;
  text-align: center;
  margin-top: -30px;
`;

const BarPercent = "10%";

const BlueLine = styled.div`
  background-color: #091b58;
  height: 20px;
  width: 1440px;
  margin-top: 0px;
`;

const MigrationBox = () => (
  <>
    <MigrationDetails />
    <ProgressBar />
    <MigrationContainer>
      <Bar width={BarPercent} />
      <BarText>{BarPercent} Total Migration</BarText>
    </MigrationContainer>
    <BlueLine />
  </>
);

export default MigrationBox;
