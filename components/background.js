import styled from "styled-components";

const BlueBackground = styled.body`
  background-color: #0a122d;
`;

const BackgroundColor = props => (
  <BlueBackground>{props.children}</BlueBackground>
);

export default BackgroundColor;
