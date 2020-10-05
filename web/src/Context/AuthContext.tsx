import React, { createContext, useState } from "react";
import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn(email: string, password: string): Promise<void>;
}

interface Response {
  token: string;
  user: {
    name: string,
    email: string,
  };
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  async function signIn(email: string, password: string) {

    const response = await api.post<Response>('/login', {email, password});

    const token = response.data.token;

    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(response.data.user);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;