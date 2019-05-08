import BackgroundColor from "../components/background";
import Logoimage from "../components/image";
import Title from "../components/indexTitle";
import SearchBox from "../components/SearchBox";
import Footer from "../components/footer";
import "../style.css";
import MainDiv from "../components/mainDiv";
import OrangeLine from "../components/OrangeLine";

const Index = props => (
  <BackgroundColor>
    <Logoimage />
    <Title />
    <MainDiv>
      <SearchBox />
    </MainDiv>
    <Footer />
  </BackgroundColor>
);

export default Index;
