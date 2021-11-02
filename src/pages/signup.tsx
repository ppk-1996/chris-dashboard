import { ReactElement } from "react";
import { useForm } from "react-hook-form";

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
        <input defaultValue="chris" {...register("username")} />
        <input type="email" defaultValue="chris" {...register("email")} />
        <input
          defaultValue="chris1234"
          type="password"
          {...register("password")}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
