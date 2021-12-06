import styled from "styled-components";
import { PRIMARY, SECONDARY } from "../../config/constants";

export const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  width: 100%;
  max-width: 400px;
  border-radius: 5px;
  border: 1px solid ${SECONDARY};

  button {
    background: none;
    border-radius: 3px;
    padding: 5px 10px;
    border: 1px solid ${PRIMARY};
    font-weight: bold;
    color: ${PRIMARY};
    :hover {
      cursor: pointer;
    }
  }

  p {
    font-size: 12px;
    margin-top: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 10px;
  }
`;
