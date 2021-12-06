import styled from "styled-components";
import { PRIMARY, SECONDARY } from "../../config/constants";
import StarRating from "react-star-ratings";
import { Link } from "react-router-dom";

const Container = styled.div`
  border: 1px solid ${SECONDARY};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 47%;
  margin: 1.5%;
  padding: 5px 0;

  p:first-child {
    color: ${PRIMARY};
    font-weight: bold;
    margin: 5px 0;
  }
  p {
    color: ${SECONDARY};
    margin-bottom: 10px;
    padding: 10px;
  }
`;

const View = styled(Link)`
  margin: 10px 0;
  color: ${PRIMARY};
`;

const Hr = styled.div`
  width: 100%;
  background: ${SECONDARY};
  height: 1px;
  margin: 5px 0 10px 0;
`;

export const Review = ({ data }) => {
  const { name, comment, rating, id } = data;
  return (
    <Container data-testid="review">
      <p data-testid="name">{name}</p>
      <Hr />
      <p data-testid="comment">{comment}</p>
      <StarRating
        starDimension="20px"
        rating={rating}
        starRatedColor={PRIMARY}
        numberOfStars={5}
      />
      <View to={"/review/" + id} data-testid="view-link">
        View
      </View>
    </Container>
  );
};
