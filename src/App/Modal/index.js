import { BACKGROUND, modalTypes } from "../../config/constants";
import { Info } from "./Info";
import { Profile } from "./Profile";
import styled from "styled-components";
import { Context } from "../../config/Context";
import { useContext } from "react";

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.4;
  z-index: 1;
  left: 0;
  top: 0;
  :hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  position: fixed;
  z-index: 2;
  padding: 20px;
  background: ${BACKGROUND};
  border-radius: 5px;
  width: 50%;
  max-width: 800px;
  margin: auto;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const Modal = ({ type, setModalStatus }) => {
  const { user } = useContext(Context);
  if (!user && type === modalTypes.PROFILE) return null;
  return (
    <>
      <Overlay onClick={() => setModalStatus({ open: false })} />
      <Container>
        {type === modalTypes.INFO ? (
          <Info user={user} />
        ) : type === modalTypes.PROFILE ? (
          <Profile user={user} />
        ) : (
          <>Error: no modal type provided as prop</>
        )}
      </Container>
    </>
  );
};
