import { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UsersContext } from "../../contex/UsersContex";
// import { UsersContext } from "../../contex/UsersContex";

function Navbar() {
  const { logOutUser } = useContext(UsersContext);

  const navigate = useNavigate();
  const handleLogOut = () => {
    logOutUser()
    Swal.fire({
      icon: "warning",
      title: "Has cerrado sesion correctamente",
    });
    localStorage.clear();

    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <li className={styles.everyButton}>
          <Link
            to="/"
            className={`${styles.everyButton} ${
              location.pathname === "/" ? styles.activeButton : ""
            }`}
          >
            Inicio{" "}
          </Link>
        </li>
        <li className={styles.everyButton}>
          {" "}
          <Link
            to="/misturnos"
            className={`${styles.everyButton} ${
              location.pathname === "/misturnos" ? styles.activeButton : ""
            }`}
          >
            {" "}
            Turnos
          </Link>
        </li>
        <li className={styles.everyButton}>
          {" "}
          <Link
            to="/agendarturno"
            className={`${styles.everyButton} ${
              location.pathname === "/agendarturno" ? styles.activeButton : ""
            }`}
          >
            {" "}
            Agendar Turno
          </Link>
        </li>
        <li className={styles.everyButton} onClick={handleLogOut}>
          Cerrar sesion
        </li>
      </nav>
    </header>
  );
}

export default Navbar;
