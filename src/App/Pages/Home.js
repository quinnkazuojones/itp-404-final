import styled from "styled-components";
import { Link } from "react-router-dom";
import { PRIMARY } from "../../config/constants";
import { useContext, useEffect } from "react";
import { Context } from "../../config/Context";
import { Review } from "../Components";

const Container = styled.div`
  a {
    color: ${PRIMARY};
  }
`;

const ReviewContainer = styled.div`
  position: absolute;
  bottom: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: auto;
  width: 95%;
`;

const Inner = styled.div`
  margin: auto;
  max-width: 1000px;
  width: 100%;
  h1 {
    margin-top: 150px;
    margin-bottom: 20px;
  }
`;

export const Home = () => {
  const { user, reviews } = useContext(Context);

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <Container>
      <Inner>
        <h1>
          <span>PlantPal</span> allows you to document and gain insights on all
          your needy house plants.
        </h1>
        <p>
          {user ? (
            <>
              <Link to="/my-plants">Click here</Link> to see all your plants!
            </>
          ) : (
            <>
              <Link to="/login">Click here</Link> to login!
            </>
          )}
        </p>
      </Inner>
      {reviews && (
        <ReviewContainer>
          {reviews.map((d, i) => {
            if (i < 5) return <Review data={d} key={d.id} />;
          })}
        </ReviewContainer>
      )}
    </Container>
  );
};
