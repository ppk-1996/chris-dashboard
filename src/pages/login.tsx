import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

type LogInData = {
  username: string;
  password: string;
};
const LogIn = (): ReactElement => {
  const { login, error } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: LogInData) => {
    const { username, password } = data;
    login(username, password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <label htmlFor="username">
          Username<span className="">*</span>
          <input
            id="username"
            type="text"
            defaultValue="chris"
            {...register("username")}
          />
        </label>
        <label htmlFor="password">
          Password<span className="">*</span>
          <input
            id="password"
            type="password"
            defaultValue="chris1234"
            {...register("password")}
          />
        </label>

        <button type="submit">Submit</button>
        <code>{error && "Incorrect Username or Password"}</code>
      </form>
      <p>OR</p>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default LogIn;
