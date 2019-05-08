import styled from "styled-components";

const ImageDiv = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const image = () => (
  <ImageDiv>
    <img
      src="/static/ministryLogo.png"
      alt="ministry logo"
      style={{ width: "6rem" }}
    />
  </ImageDiv>
);

export default image;
