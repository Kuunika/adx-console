import styled from "styled-components";

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

const Details = () => (
  <DetailsDiv>
    <List>
      <RightText>Migration # </RightText>
      <RightText>OpenLMIS Data for </RightText>
      <RightText>Chemonics </RightText>
    </List>
    <List2>
      <CenterText>00:00:00</CenterText>
      <LeftText>Elapsed</LeftText>
    </List2>
    <List3>
      <LeftText>Migration Started </LeftText>
      <LeftText>-- Data Elements Sent</LeftText>
      <LeftText>-- Data Elements Migrated</LeftText>
      <LeftText>-- Data Elements Failed</LeftText>
    </List3>
  </DetailsDiv>
);

export default Details;
