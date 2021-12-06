import { useState, useContext, useEffect } from "react";
import { auth } from "../../config/firebase";
import { AuthContainer, Error, Form } from "../Components";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../config/Context";

export const Signup = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  if (user) navigate("/");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Signup Page";
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AuthContainer>
      <Form onSubmit={signUp}>
        <h3>Sign Up</h3>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        {error && <Error>{error.message}</Error>}
        <p>
          Already have an account? <Link to="/login">Login here.</Link>
        </p>
      </Form>
    </AuthContainer>
  );
};
