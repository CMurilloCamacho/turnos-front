import { useContext, useState } from "react";
import styles from "./Register.module.css";
import { formValidates } from "../../helpers/formValidates";
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../contex/UsersContex";

const Register = () => {
  const {registerUser} = useContext(UsersContext)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "El nombre es requerido",
    email: "El correo es requerido",
    birthdate: "La fecha de cumpleaños es requerida",
    nDni: "Tu numero DNI es requerido",
    username: "Tu nombre de usuario es requerido",
    password: "Tu contraseña es requerida",
  });

  const isFormValid = Object.values(errors).every((error) => error === "");
  const handleInputChange = (e) => {
    const updateUserData = {
      ...userData,
      [e.target.name]: e.target.value,


      // console.log(updateUserData)
    };

    const errorsObject = formValidates(updateUserData);
    setUserData(updateUserData);
    setErrors(errorsObject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      return;
    }
  

    
    try {
      await registerUser(userData)
      Swal.fire({
        icon: "success",
        title: "Usuario registrado con éxito"
      })
      navigate("/login")
     
      
      
    } catch (err) {
      if(err.response.data.details.includes("UQ_e7f1e0d33d9012a8bf2f008fe75")){
        Swal.fire({
          icon: "error",
          title: `Ya existe el numero de DNI ${userData.nDni}`
        })

      }
      if(err.response.data.details.includes("UQ_97672ac88f789774dd47f7c8be3")){
        Swal.fire({
          icon: "error",
          title: `Ya existe el email ${userData.email}`
        })

      }
      if(err.response.data.details.includes("username")){
        Swal.fire({
          icon: "error",
          title: `El username ${userData.username} ya existe`
        })

      }
    }
  };
  

  

  



  return (
    <form className={styles.formContainer} onSubmit={(e) => handleSubmit(e)}>
      <h1>COMPONENTE REGISTER</h1>
      <h2>Formulario de registro</h2>

      <div className={styles.inputGroup}>
        <label>Name: </label>
        <input
          type="text"
          placeholder="Tu nombre"
          onChange={(e) => handleInputChange(e)}
          name="name"
        />
        <label className={styles.errorStyle}>
          {errors.name ? errors.name : ""}
        </label>
      </div>

      <div className={styles.inputGroup}>
        <label>Email: </label>
        <input
          type="email"
          placeholder="Tu Email"
          onChange={handleInputChange}
          name="email"
        />
        <label className={styles.errorStyle}>
          {errors.email ? errors.email : ""}
        </label>
      </div>

      <div className={styles.inputGroup}>
        <label>Birthdate: </label>
        <input
          type="date"
          placeholder="Tu fecha de nacimiento"
          name="birthdate"
          onChange={(e) => handleInputChange(e)}
        />
        <label className={styles.errorStyle}>
          {errors.birthdate ? errors.birthdate : ""}
        </label>
      </div>

      <div className={styles.inputGroup}>
        <label>DNI: </label>
        <input
          type="text"
          placeholder="Tu DNI"
          name="nDni"
          onChange={(e) => handleInputChange(e)}
        />
        <label className={styles.errorStyle}>
          {errors.nDni ? errors.nDni : ""}
        </label>
      </div>

      <div className={styles.inputGroup}>
        <label>Username: </label>
        <input
          type="text"
          placeholder="Tu nombre de usuario"
          name="username"
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
        Registrar
      </button>
      <br />
        <label >Ya tienes una cuenta <Link to= "/login"> Login </Link> </label>
    </form>
  );
};

export default Register;






