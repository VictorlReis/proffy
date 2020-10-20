import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import history from '../history';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  Login(email: string, password: string): Promise<void>;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if(storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      console.log('storagedToken : ' + api.defaults.headers.Authorization)
    }
  }, []);

  async function Login(email: string, password: string) {
    const response = await api.post('/login', {
      email,
      password 
    });

    localStorage.setItem('@App:user', JSON.stringify(response.data.user));
    localStorage.setItem('@App:token', JSON.stringify(response.data.token));
    console.log('reponse.data.token : ' + response.data.token)

    setUser(response.data.user);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    console.log(response);
  }

  function Logout() {
    setUser(null);
    
    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
  }

  return(
    <AuthContext.Provider value={{signed: Boolean(user), user, Login, Logout}}>
        {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;


