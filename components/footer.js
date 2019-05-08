import styled from "styled-components";

const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.span`
  list-style-type: none;
  padding: 18px 0px 10px 0px;
`;

const List2 = styled.span`
  display: inline;
  padding: 0px 0px 0px 10px;
`;

const FooterText = styled.a`
  color: #ffffff;
`;

const Footer = () => (
  <FooterDiv>
    <List>
      <List2>
        <FooterText>About Project</FooterText>
      </List2>
      <List2>
        <FooterText>Get in Touch</FooterText>
      </List2>
    </List>
  </FooterDiv>
);

export default Footer;
