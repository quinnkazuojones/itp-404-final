import styled from "styled-components";

const StyledCentered = styled.p`
  text-align: center;
`;

export const Centered = ({ children }) => (
  <StyledCentered data-testid="centered">{children}</StyledCentered>
);
