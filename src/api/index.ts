/* eslint-disable camelcase */
import Client from "@fnndsc/chrisapi";

type User = {
  id: string;
  username: string;
  email: string;
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const client = new Client(process.env.VITE_REACT_APP_CHRIS_UI_URL || "", {
    token,
  });
  return client.getUser().then((res) => {
    const userArray = res.collection.items[0].data;
    const user: User = {
      id: userArray[0].value,
      username: userArray[1].value,
      email: userArray[2].value,
    };
    return user;
  });
};

type LogInData = {
  username: string;
  password: string;
};
type CreateUserReturnType = {
  user: User;
  auth: LogInData;
};
export const createUser = async (
  username: string,
  password: string,
  email: string
): Promise<CreateUserReturnType> =>
  Client.createUser(
    process.env.VITE_REACT_APP_CHRIS_UI_USERS_URL || "",
    username,
    password,
    email
  ).then((res) => {
    const { auth } = res;
    const userArray = res.collection.items[0].data;
    const user: User = {
      id: userArray[0].value,
      username: userArray[1].value,
      email: userArray[2].value,
    };
    return { user, auth };
  });
