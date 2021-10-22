import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getAuth } from "@firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  Box,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });
  const auth = getAuth();
  const { login, currentUser } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      setFormError({ ...formError, email: true, password: true });
    } else if (password === "") {
      setFormError({ ...formError, password: true });
    } else if (email === "") {
      setFormError({ ...formError, password: true });
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/");
    } catch {
      setError("Email or password is incorrect");
    }
    setTimeout(() => {
      setFormError({
        email: false,
        password: false,
      });
    });

    setLoading(false);
  };
  useEffect(() => {
    if (currentUser) {
      history.replace("/");
    }
  }, []);

  return (
    <div className="w-screen space-y-6 flex flex-col justify-center items-center">
      <div className="w-auto sm:w-96  flex-grow-1">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-6 content-center mt-20 text-gray-700 flex-grow-0">
          <div className="flex justify-center text-center">
            <h1 className="font-semibold">
              Please enter an email and password to sign up
            </h1>
          </div>
          <div className="space-y-4">
            <FormControl fullWidth error={formError.email}>
              <TextField
                fullWidth
                id="outlined-helperText"
                value={email}
                label="Email"
                error={formError.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth error={formError.password}>
              <TextField
                fullWidth
                id="outlined-helperText"
                value={password}
                label="Password"
                type="password"
                error={formError.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="flex items-center justify-center pt-4">
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-blue-500 w-36 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="flex">
          <p className="mr-4">Already have an account?</p>
          <Link className="text-blue-700" to="/login">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
