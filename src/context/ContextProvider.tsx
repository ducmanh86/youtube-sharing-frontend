import {createContext, useContext, useState} from "react";
import {User} from "../apis/auth.api";

type ContextProps = {
  user?: User;
  setUser: (user?: User) => Promise<void> | void;
  token?: string;
  setToken: (token?: string) => Promise<void> | void;
  notification?: string;
  setNotification: (notification: string) => Promise<void> | void;
}

const StateContext = createContext<ContextProps>({
  user: undefined,
  token: undefined,
  notification: undefined,
  setUser() {},
  setToken: () => {},
  setNotification: () => {},
})

export const useStateContext = () => useContext(StateContext);

export const ContextProvider = ({children}: any) => {
  const [user, setUser] = useState<User | undefined>();
  const [token, _setToken] = useState<string | undefined>(localStorage.getItem('ACCESS_TOKEN') || undefined);
  const [notification, _setNotification] = useState('');

  const setToken = (token: any) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const setNotification = (message: any) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notification,
      setNotification,
    }}>
      {children}
    </StateContext.Provider>
  );
}
