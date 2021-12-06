import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { PRIMARY } from "../../config/constants";
import { Context } from "../../config/Context";
import { useContext, useEffect } from "react";

const Container = styled.div`
  padding: 50px;
  h1 {
    margin-bottom: 10px;
  }
  span {
    color: ${PRIMARY};
  }
  h3 {
    margin-bottom: 20px;
  }
  a {
    color: ${PRIMARY};
  }
  p {
    margin-bottom: 10px;
  }
`;

export const Review = () => {
  const { id } = useParams();

  const { reviews } = useContext(Context);

  useEffect(() => {
    document.title = "Specific Review Page";
  }, []);

  const review = reviews && reviews.find((review) => review.id === id);
  if (!review) return <p>Review not found...</p>;
  return (
    <Container>
      <h1>
        Review from <span>{review.name}</span>
      </h1>
      <h3>
        <span>{review.name}</span> said <span>{review.comment}</span>
      </h3>
      <p>
        <span>{review.name}</span> gave this app <span>{review.rating}</span>{" "}
        stars
      </p>
      <Link to="/reviews">Back</Link>
    </Container>
  );
};
