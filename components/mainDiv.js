import styled from "styled-components";
import OrangeLine from "./OrangeLine";

const LightBlueDiv = styled.div`
  background-color: #596287;
  min-height: calc(50vh - 1rem);
  padding: 0px;
  margin: 0px;
`;

const SearchBox = props => <LightBlueDiv>{props.children}</LightBlueDiv>;

export default SearchBox;
