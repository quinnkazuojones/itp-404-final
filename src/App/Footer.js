import styled from "styled-components";
import { BACKGROUND, SECONDARY } from "../config/constants";

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: ${SECONDARY};
  height: 60px;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  p {
    margin: 0 5px;
    color: ${BACKGROUND};
  }
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <p>Quinn Jones</p>
      <p>|</p>
      <p>ITP404</p>
      <p>|</p>
      <p>Professor David Tang</p>
    </StyledFooter>
  );
};
