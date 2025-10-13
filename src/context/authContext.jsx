import { createContext, useContext, useEffect, useState } from "react";
import { onAuthChange } from "../services/authService.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔧 AuthContext: Setting up auth listener");

    // Підписуємось на зміни авторизації
    const unsubscribe = onAuthChange((user) => {
      console.log("🔄 Auth state changed:", user ? user.email : "No user");
      setCurrentUser(user);
      setLoading(false);
    });

    // Відписуємось при розмонтуванні
    return () => {
      console.log("🔧 AuthContext: Cleaning up auth listener");
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading,
  };

  console.log("AuthContext render, currentUser:", currentUser); // Дебаг

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
