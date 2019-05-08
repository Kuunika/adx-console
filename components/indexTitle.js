import styled from "styled-components";

const MainTitle = styled.h1`
  color: #ffffff;
  text-align: center;
  margin-bottom: 0;
`;

const VersionTitle = styled.h4`
  color: #ffffff;
  text-align: center;
  margin-top: 0;
`;

const Title = () => (
  <div>
    <MainTitle>Malawi Health Aggregate Data Exchange Console</MainTitle>
    <VersionTitle>version 0.1</VersionTitle>
  </div>
);

export default Title;
