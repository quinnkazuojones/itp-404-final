import styled from "styled-components";
import { SECONDARY, PRIMARY } from "../../config/constants";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../config/Context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Form } from "../Components";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { set } from "react-hook-form";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: auto;
  max-width: 1000%;
  margin-top: 40px;

  width: 100%;
`;

export const MyPlants = () => {
  const { user } = useContext(Context);
  const [nickname, setNickname] = useState("");
  const [type, setType] = useState("");
  const [height, setHeight] = useState("");

  const addPlant = async (e) => {
    e.preventDefault();
    const payload = {
      id: uuid(),
      nickname,
      type,
      height,
    };
    await setDoc(doc(db, "users", user.authId), {
      email: user.email,
      id: user.id,
      plants: [...user.plants, payload],
    });
    setNickname("");
    setType("");
    setHeight("");
    toast.success("Added!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <>
      <Form onSubmit={addPlant}>
        <h3>New Plant</h3>
        <div>
          <label for="nickname">Nickname:</label>
          <input
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div>
          <label for="type">Type:</label>
          <input
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label for="height">Height:</label>
          <input
            name="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button type="submit">Add Plant</button>
      </Form>
      <Container>
        {user &&
          user.plants.map(({ type, nickname, height, id }) => (
            <Plant
              user={user}
              key={id}
              id={id}
              type={type}
              nickname={nickname}
              height={height}
            />
          ))}
      </Container>
    </>
  );
};

const Module = styled.div`
  margin: 1%;
  width: 23%;
  border-radius: 5px;
  border: 1px solid ${SECONDARY};
  padding: 20px;
  position: relative;

  > p {
    margin-bottom: 8px;
  }
  span {
    color: ${PRIMARY};
    font-weight: bold;
  }

  a {
    color: ${PRIMARY};
  }

  form {
    input {
      border: 1px solid ${PRIMARY};
      border-radius: 3px;
      color: ${PRIMARY};
    }
    div {
      margin-bottom: 10px;
    }
    label {
      margin-right: 5px;
    }
    button {
      padding: 5px 10px;
      background: none;
      border: 1px solid ${PRIMARY};
      color: ${PRIMARY};
      font-weight: bold;
      border-radius: 3px;
    }
  }
`;

const EditContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  text-align: right;
  p:hover {
    cursor: pointer;
  }
  p {
    font-weight: bold;
    color: ${PRIMARY};
  }

  p:first-child {
    color: ${SECONDARY};
    margin-bottom: 10px;
  }
`;

const Plant = ({ type, nickname, height, id, user }) => {
  const [editing, setEditing] = useState();
  const [_nickname, setNickname] = useState(nickname);
  const [_type, setType] = useState(type);
  const [_height, setHeight] = useState(height);

  useEffect(() => {
    document.title = "My Plants";
  }, []);

  const deletePlant = () => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      setDoc(doc(db, "users", user.authId), {
        email: user.email,
        id: user.id,
        plants: user.plants.filter((plant) => plant.id !== id),
      });
      toast.warn("Deleted!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const savePlant = async (e) => {
    e.preventDefault();

    const payload = {
      nickname: _nickname,
      type: _type,
      height: _height,
      id,
    };

    await setDoc(doc(db, "users", user.authId), {
      email: user.email,
      id: user.id,
      plants: user.plants.map((plant) => {
        if (plant.id === id) {
          return payload;
        } else return plant;
      }),
    });
    setEditing(false);
  };

  return (
    <Module>
      {editing ? (
        <form onSubmit={savePlant}>
          <div>
            <label for="nickname">Nickname:</label>
            <input
              name="nickname"
              onChange={(e) => setNickname(e.target.value)}
              value={_nickname}
            />
          </div>
          <div>
            <label for="type">Type:</label>
            <input
              name="type"
              onChange={(e) => setType(e.target.value)}
              value={_type}
            />
          </div>
          <div>
            <label for="height">Height:</label>
            <input
              name="height"
              onChange={(e) => setHeight(e.target.value)}
              value={_height}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <EditContainer>
            <p onClick={deletePlant}>Delete</p>
            <p onClick={() => setEditing(true)}>Edit</p>
          </EditContainer>
          <p>
            Nickname: <span>{nickname}</span>
          </p>
          <p>
            Type: <span>{type}</span>
          </p>
          <p>
            Height: <span>{height}</span>
          </p>
          <Link to={"/plant/" + id}>View</Link>
        </>
      )}
    </Module>
  );
};
