import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

type SignUpData = {
  username: string;
  email: string;
  password: string;
};
const SignUp = (): ReactElement => {
  const { signUp } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: SignUpData) => {
    const { username, password, email } = data;
    signUp(username, password, email);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          Username
          <input type="text" {...register("username")} />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" {...register("email")} />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" {...register("password")} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>OR</p>
      <Link to="/login">Log In</Link>
    </div>
  );
};

export default SignUp;
