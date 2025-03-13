/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Misturnos from "./views/MisTurnos/MisTurnos";

import styles from "./App.module.css";
import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import NotFound from "./views/NotFound/NotFound";
import { UsersContext } from "./contex/UsersContex";
import AgendarTurno from "./components/AgendarTurno/AgendarTurno";

function App() {
  const [isNotFound, setIsNotFound] = useState(false);
  const { user } = useContext(UsersContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   

    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }

    if (
      (user && location.pathname == "/login") ||
      (user && location.pathname === "/register")
    ) {
      navigate("/");
    }
  }, [location.navigate, user, navigate]);

  return (
    <>
      {!user ? (
        <main className={styles.mainBackground}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      ) : (
        <>
          {!isNotFound && (
            <header>
              <Navbar />
            </header>
          )}
          <main className={styles.mainBackground}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/misturnos" element={<Misturnos />} />
              <Route path="/agendarturno" element={<AgendarTurno />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}

export default App;
