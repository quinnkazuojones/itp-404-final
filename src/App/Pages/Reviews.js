import { Review } from "../Components";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { Context } from "../../config/Context";
import { useContext, useState, useEffect } from "react";
import StarRating from "react-star-ratings";
import { PRIMARY, SECONDARY } from "../../config/constants";
import { Form } from "../Components";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
  width: 80%;
  max-width: 1000px;
`;

const Submitted = styled.p`
  font-style: italic;
  text-align: center;
  margin-top: 20px;
`;

export const Reviews = () => {
  const { reviews } = useContext(Context);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Reviews Page";
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    const payload = {
      name,
      comment,
      rating,
      id: uuid(),
    };
    await addDoc(collection(db, "reviews"), payload);
    setName("");
    setRating(5);
    setComment("");
    setSubmitted(true);
  };

  return (
    <>
      <Form onSubmit={submitReview}>
        <h3>Write a review:</h3>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            required
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <StarRating
          numberOfStars={5}
          rating={rating}
          starRatedColor={PRIMARY}
          changeRating={setRating}
          starHoverColor={SECONDARY}
          starDimension="25px"
        />
        <button type="submit">Submit</button>
        {submitted && <Submitted>Submitted!</Submitted>}
      </Form>
      <Container>
        {reviews ? (
          reviews.map((d, i) => <Review data={d} key={d.id} />)
        ) : (
          <p>Loading reviews...</p>
        )}
      </Container>
    </>
  );
};
