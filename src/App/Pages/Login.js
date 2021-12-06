import { useState, useContext, useEffect } from "react";
import { auth } from "../../config/firebase";
import { AuthContainer, Error, Form } from "../Components";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../config/Context";

export const Login = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  if (user) navigate("/");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AuthContainer>
      <Form onSubmit={signIn}>
        <h3>Login</h3>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <Error>{error.message}</Error>}
        <p>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>.
        </p>
      </Form>
    </AuthContainer>
  );
};
