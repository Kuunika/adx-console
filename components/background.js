import styled from "styled-components";

const BlueBackground = styled.div`
  background-color: #0a122d;
`;

const Background = props => <BlueBackground>{props.children}</BlueBackground>;

export default Background;
