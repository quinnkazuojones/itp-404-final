import styled from "styled-components";
import { GREY } from "../../config/constants";
import { auth } from "../../config/firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  p {
    margin: 10px 0;
  }
`;

export const Logout = styled.a`
  color: ${GREY};
  margin: 20px 0;
`;

export const Profile = ({ user }) => {
  return (
    <Container>
      <h2>Welcome Back {user.email}!</h2>
      <p># Plants: {user.plants.length}</p>
      <Logout onClick={() => auth.signOut()} href="#">
        Logout
      </Logout>
    </Container>
  );
};
