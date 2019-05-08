import styled from "styled-components";

const ProgressText = styled.p`
  color: #0a122d;
  font-size: 16px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 5px;
  font-style: oblique;
  font-family: "Arial", Arial, Sans-serif;
  font-weight: bold;
`;

const Text = () => (
  <ProgressText>Reciving data, saving payload to database...</ProgressText>
);

export default Text;
