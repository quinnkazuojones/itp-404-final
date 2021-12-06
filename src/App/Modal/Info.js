import styled from "styled-components";

const Container = styled.div`
  p {
    margin: 10px 0;
  }
`;

export const Info = ({ user }) => {
  return (
    <Container>
      <h2>About</h2>
      <p>Hi {user ? ", " + user.email : "friend"}!</p>
      <p>
        This is my ITP404 final project, I hope you enjoy! Add plants and their
        details to your library, and please leave a review!
      </p>
    </Container>
  );
};
