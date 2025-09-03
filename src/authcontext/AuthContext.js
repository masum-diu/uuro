import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState("null")
  const [users, setUsers] = useState("null")
  const [bage, setBage] = useState(0); // default to 0
  const [cur, setCur] = useState('null')
  const [businessid, setBusinessid] = useState(null)

  // Initial load from localStorage
  useEffect(() => {
    const storedBadge = localStorage.getItem("badgeCount");
    if (storedBadge) {
      setBage(Number(storedBadge));
    }
  }, []);

  // Update badge state and sync with localStorage
  const updateBadge = (count) => {
    setBage(count);
    localStorage.setItem("badgeCount", count);
  };

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    const getTokenToken = localStorage.getItem('token');
    setToken(getTokenToken);
  };


  const signOut = async () => {

    try {
      await localStorage.removeItem('token')
      router.push('/');
    } catch (error) {
      // console.error('Error saving token:', error);
    }

  };


  return (
    <AuthContext.Provider value={{ signOut, token, businessid, setBusinessid, users, setUsers, bage, setBage, cur, setCur,updateBadge }}>
      {children}
    </AuthContext.Provider>
  );
};