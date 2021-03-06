import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";

// eslint-disable-next-line import/no-duplicates
import Client from "@fnndsc/chrisapi";
// eslint-disable-next-line import/no-duplicates
import RequestException from "@fnndsc/chrisapi";

import { createUser, getCurrentUser } from "../api";
import { getStorageWithExpiry, setStorageWithExpiry } from "../utils/helpers";

type User = {
  id: string;
  username: string;
  email: string;
};

type LoginType = (email: string, password: string) => void;

type SignUpType = (username: string, password: string, email: string) => void;

type AuthContextType = {
  user: User;
  loading: boolean;
  error?: Promise<RequestException>;
  login: LoginType;
  signUp: SignUpType;
  logout: () => void;
  client: Client;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<Promise<RequestException> | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [client, setClient] = useState<Client>();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setError(null);
  }, [location.pathname]);

  useEffect(() => {
    setLoadingInitial(true);
    const token = getStorageWithExpiry("CHRIS_TOKEN");
    const getData = async () => {
      if (token) {
        getCurrentUser(token)
          .then((newUser) => {
            setUser(newUser);
            setClient(
              new Client(process.env.VITE_REACT_APP_CHRIS_UI_URL || "", {
                token,
              })
            );
          })
          .catch((_error) => {
            setError(_error);
            setLoading(false);
            setUser(undefined);
          })
          .finally(() => setLoadingInitial(false));
      } else {
        setLoadingInitial(false);
      }
    };

    getData();
  }, []);

  function login(email: string, password: string) {
    setLoading(true);
    Client.getAuthToken(
      process.env.VITE_REACT_APP_CHRIS_UI_AUTH_URL || "",
      email,
      password
    )
      .then((token) => {
        setStorageWithExpiry("CHRIS_TOKEN", token, 2000 * 1000);
        getCurrentUser(token).then((newUser) => {
          setUser(newUser);
          setClient(
            new Client(process.env.VITE_REACT_APP_CHRIS_UI_URL || "", {
              token,
            })
          );
          history.push("/");
        });
      })
      .catch((_error) => setError(_error))
      .finally(() => setLoading(false));
  }

  function signUp(username: string, password: string, email: string) {
    setLoading(true);

    createUser(username, password, email)
      .then((newUser) => {
        Client.getAuthToken(
          process.env.VITE_REACT_APP_CHRIS_UI_AUTH_URL || "",
          newUser.auth.username,
          newUser.auth.password
        ).then((token) => {
          setStorageWithExpiry("CHRIS_TOKEN", token, 2000 * 1000);
          setUser(newUser.user);
          setClient(
            new Client(process.env.VITE_REACT_APP_CHRIS_UI_URL || "", {
              token,
            })
          );
          history.push("/");
        });
      })
      .catch((_error) => setError(_error))
      .finally(() => {
        setLoading(false);
      });
  }

  function logout() {
    setUser(undefined);
    localStorage.removeItem("CHRIS_TOKEN");
  }

  // Make the provider update only when it should
  const values = {
    user,
    loading,
    error,
    login,
    signUp,
    logout,
    client,
  };

  return (
    <AuthContext.Provider value={values as AuthContextType}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
