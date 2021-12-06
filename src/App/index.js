import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./Header";
import { useRef } from "react";
import {
  NotFound,
  Home,
  Signup,
  Login,
  MyPlants,
  Plant,
  Reviews,
  Review,
  Identify,
} from "./Pages";
import { Footer } from "./Footer";

const Wrapper = styled.div`
  padding: 20px;
`;

const Main = styled.main`
  margin-top: 20px;
  margin-bottom: 100px;
`;

export const App = () => {
  const ref = useRef(null);

  return (
    <Wrapper ref={ref}>
      <Header modalTargetRef={ref} />
      <Main>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/my-plants" element={<MyPlants />} />
          <Route exact path="/plant/:id" element={<Plant />} />
          <Route exact path="/reviews" element={<Reviews />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/identify" element={<Identify />} />
          <Route exact path="/review/:id" element={<Review />} />
        </Routes>
      </Main>
      <Footer />
    </Wrapper>
  );
};
