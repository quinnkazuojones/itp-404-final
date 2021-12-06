import { useParams, Link } from "react-router-dom";
import { Context } from "../../config/Context";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { PRIMARY } from "../../config/constants";

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
`;

export const Plant = () => {
  const { id } = useParams();
  const { user } = useContext(Context);

  useEffect(() => {
    document.title = "Specific Plant Page";
  }, []);

  const plant = user && user.plants.find((plant) => plant.id === id);
  if (plant)
    return (
      <Container>
        <h1>
          Nickname: <span>{plant.nickname}</span>
        </h1>
        <h3>
          Type: <span>{plant.type}</span>
        </h3>
        <h3>
          Height: <span>{plant.height}</span>
        </h3>
        <Link to="/my-plants">Back</Link>
      </Container>
    );
  else return <p>Plant not found...</p>;
};
