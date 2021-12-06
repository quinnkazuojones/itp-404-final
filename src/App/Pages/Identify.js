import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { PRIMARY, SECONDARY } from "../../config/constants";
import { Centered } from "../Components";

const Container = styled.div`
  margin: 40px;
  h1 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 10px;
  }
  ul {
    margin-bottom: 10px;
  }

  a {
    color: ${SECONDARY};
  }

  span,
  li {
    color: ${PRIMARY};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  button {
    margin-top: 10px;
  }
  button,
  input {
    padding: 5px 10px;
    background: none;
    border: 1px solid ${PRIMARY};
    color: ${PRIMARY};
    font-weight: bold;
    border-radius: 3px;
  }
`;

export const Identify = () => {
  const ref = useRef();
  const [plant, setPlant] = useState();

  useEffect(() => {
    if (plant === "loading") {
      const files = [...ref.current.files];
      const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const res = event.target.result;
            resolve(res);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((base64files) => {
        const data = {
          api_key: "F2nY92kDMH0XrhqbZyea1OMHk3dX9oY6PelIiFYrLLpBx78SbH",
          images: base64files,
          modifiers: ["crops_fast", "similar_images"],
          plant_language: "en",
          plant_details: [
            "common_names",
            "url",
            "name_authority",
            "wiki_description",
            "taxonomy",
            "synonyms",
          ],
        };

        fetch("https://api.plant.id/v2/identify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            setPlant(data.suggestions[0]);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    }
  }, [plant]);

  const identify = (e) => {
    e.preventDefault();
    setPlant("loading");
  };

  console.log(plant);

  if (plant && plant !== "loading")
    return (
      <Container>
        <h1>{plant.plant_name}</h1>
        <p>Common Names:</p>
        <ul>
          {plant.plant_details.common_names.map((name) => (
            <li>{name}</li>
          ))}
        </ul>
        {plant.plant_details.taxonomy && (
          <>
            <p>
              Class: <span>{plant.plant_details.taxonomy.class}</span>
            </p>
            <p>
              Family: <span>{plant.plant_details.taxonomy.family}</span>
            </p>
            <p>
              Genus: <span>{plant.plant_details.taxonomy.genus}</span>
            </p>
            <p>
              Kingdom: <span>{plant.plant_details.taxonomy.kingdom}</span>
            </p>
            <p>
              Order: <span>{plant.plant_details.taxonomy.order}</span>
            </p>
            <p>
              Phylum: <span>{plant.plant_details.taxonomy.phylum}</span>
            </p>{" "}
          </>
        )}

        <p>
          <a href={plant.plant_details.url} target="_blank">
            Description:
          </a>
        </p>
        <p>
          <span>{plant.plant_details.wiki_description.value}</span>
        </p>
      </Container>
    );

  return (
    <Container>
      <form onSubmit={identify}>
        <h1>Upload a photo to learn about your plant!</h1>
        <input type="file" multiple ref={ref} />
        <button type="submit">Identify</button>
      </form>

      {plant === "loading" && <Centered>Searching for plant...</Centered>}
    </Container>
  );
};
