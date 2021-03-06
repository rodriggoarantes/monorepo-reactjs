import React, {
  useState,
  useContext,
  createContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

const noop = () => {};

const AuthContext = createContext({
  user: null,
  login: noop,
  logout: noop,
});

const AuthenticationProvider = props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStoraged = localStorage.getItem('user');
    if (userStoraged) {
      setUser(JSON.parse(userStoraged));
    }
  }, []);

  const login = useCallback(userParam => {
    localStorage.setItem('user', JSON.stringify(userParam));
    setUser(userParam);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const memoAuth = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={memoAuth} {...props} />;
};

export default AuthenticationProvider;

export const useAuthentication = () => useContext(AuthContext);
