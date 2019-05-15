import styled from "styled-components";
import Logoimage from "./image";
import Title from "./indexTitle";
import Footer from "./footer";
import "../style.css";

const Container = styled.div`
  background-color: #596287;
  min-height: calc(50vh - 1rem);
  padding: 0px;
  margin: 0px;
`;

const BlueBackground = styled.body`
  background-color: #0a122d;
`;

const Layout = props => (
  <BlueBackground>
    <Logoimage />
    <Title />
    <Container>{props.children}</Container>
    <Footer />
  </BlueBackground>
);

export default Layout;
