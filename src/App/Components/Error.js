import styled from "styled-components";

const StyledError = styled.p`
  color: red;
`;

export const Error = ({ children }) => {
  return <StyledError data-testid="error">{children}</StyledError>;
};
