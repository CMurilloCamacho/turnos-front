/* eslint-disable no-unused-vars */

import { useState, useContext } from "react";
import styles from "./Login.module.css";
import { loginFormValidate } from "../../helpers/loginFormValidate";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../contex/UsersContex";

const Login = () => {
  const { loginUser } = useContext(UsersContext);
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "Tu nombre de usuario es requerido",
    password: "Tu contraseña es requerida",
  });

  const isFormValid = Object.values(errors).every((error) => error === "");

  const handleInputChange = (e) => {
    const updateUserData = {
      ...userData,
      [e.target.name]: e.target.value,
    };

    const errorsObject = loginFormValidate(updateUserData);
    setUserData(updateUserData);
    setErrors(errorsObject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;

    }

    

    try {
      await loginUser(userData);
      Swal.fire({
        icon: "success",
        title: "Usuario logueado con éxito",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
      });
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Formulario de LOGIN</h2>

      <div className={styles.inputGroup}>
        <label>Username: </label>
        <input
          type="text"
          placeholder="Tu nombre de usuario"
          name="username"
          onChange={handleInputChange}
        />
        <label className={styles.errorStyle}>
          {errors.username ? errors.username : ""}
        </label>
      </div>

      <div className={styles.inputGroup}>
        <label>Password: </label>
        <input
          type="password"
          placeholder="Tu contraseña"
          name="password"
          onChange={handleInputChange}
        />
        <label className={styles.errorStyle}>
          {errors.password ? errors.password : ""}
        </label>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={styles.submitButton}
      >
        Iniciar sesión
      </button>
      <br />
      <label>
        ¿Aún no tienes una cuenta? <Link to="/register">Regístrate</Link>
      </label>
    </form>
  );
};

export default Login;
