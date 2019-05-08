import styled from "styled-components";
import MainDiv from "./mainDiv";
import OrangeLine from "./OrangeLine";

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

const MigrationButton = styled.button`
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

const SearchBox = () => (
  <MainDiv>
    <FieldButtonDiv>
      <SearchFiled placeholder="Enter Migration ID (Sent as part of migration response)" />
      <MigrationButton>Track Migration</MigrationButton>
    </FieldButtonDiv>
    <OrangeLine />
  </MainDiv>
);

export default SearchBox;
