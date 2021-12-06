import styled from "styled-components";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Profile } from "../assets/profile.svg";
import { ReactComponent as Info } from "../assets/info.svg";
import { PRIMARY, SECONDARY, modalTypes } from "../config/constants";
import { createPortal } from "react-dom";
import { Modal } from "./Modal";
import { Context } from "../config/Context";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  a {
    margin-left: 15px;
    font-weight: bold;
    color: ${SECONDARY};
  }

  .active {
    color: ${PRIMARY};
  }
`;

const StyledProfile = styled(Profile)`
  :hover {
    cursor: pointer;
  }
`;

const Right = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  path {
    fill: ${SECONDARY};
  }
  p {
    margin-right: 10px;
    font-style: italic;
  }
`;

const StyledInfo = styled(Info)`
  margin-right: 10px;
  :hover {
    cursor: pointer;
  }
`;

const StyledLogo = styled(Logo)`
  :hover {
    cursor: pointer;
  }
`;

export const Header = ({ modalTargetRef }) => {
  const { user, authedUser } = useContext(Context);
  const navigate = useNavigate();

  const [modalStatus, setModalStatus] = useState({
    open: false,
    type: null,
  });

  const openModal = (type) => {
    if (type === modalTypes.PROFILE && !user) {
      return navigate("/login");
    }
    setModalStatus({ open: !modalStatus.open, type });
  };

  return (
    <Wrapper>
      <StyledLogo width="75px" onClick={() => navigate("/")} />
      <NavLink to="/">Home</NavLink>
      {user && (
        <>
          <NavLink to="/my-plants">My Plants</NavLink>
          <NavLink to="/identify">Identify A Plant</NavLink>
        </>
      )}
      <NavLink to="/reviews">Reviews</NavLink>
      <Right>
        {authedUser && !user ? <p>Fetching User Data...</p> : null}
        <StyledInfo width="25px" onClick={() => openModal(modalTypes.INFO)} />
        <StyledProfile
          onClick={() => openModal(modalTypes.PROFILE)}
          width="35px"
        />
      </Right>
      {modalStatus.open
        ? createPortal(
            <Modal type={modalStatus.type} setModalStatus={setModalStatus} />,
            modalTargetRef.current
          )
        : null}
    </Wrapper>
  );
};
