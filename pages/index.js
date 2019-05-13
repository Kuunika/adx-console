import Background from "../components/Background";
import Logoimage from "../components/image";
import Title from "../components/indexTitle";
import SearchBox from "../components/SearchBox";
import Footer from "../components/footer";
import styled from "styled-components";

const MainDiv = styled.div`
  background-color: #596287;
  min-height: calc(50vh - 1rem);
  padding: 0px;
  margin: 0px;
`;

const Index = props => (
  <Background>
    <Logoimage />
    <Title />
    <MainDiv>
      <SearchBox />
    </MainDiv>
    <Footer />
  </Background>
);

export default Index;
