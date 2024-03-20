import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {CreateAccount} from "./pages/CreateAccount";
import {UserProvider} from "./context/userContext";
import {api} from "./index";
import {IUser} from "./types/user";
import {ProtectedLogin, ProtectedRoute} from "./component/privateRoute";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    api
      .getMe()
      .then((answ) => {
        setUser(answ.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserProvider
      user={user}
      saveUser={(props) => {
        setUser((prevState) => ({ ...prevState, ...props }));
      }}
    >
      <div className="h-full text-white  bg-gray-50 dark:bg-gray-900">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <ProtectedLogin user={user}>
                  <Login />
                </ProtectedLogin>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedLogin user={user}>
                  <CreateAccount />
                </ProtectedLogin>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
