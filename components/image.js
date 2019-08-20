import styled from "styled-components";

const ImageDiv = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
`;

const image = () => (
  <ImageDiv>
    <img
      src="/static/ministryLogo.png"
      alt="ministry logo"
      style={{ width: "3rem" }}
    />
  </ImageDiv>
);

export default image;
