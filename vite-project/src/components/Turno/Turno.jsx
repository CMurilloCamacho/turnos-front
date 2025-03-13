/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import styles from "./Turno.module.css";
import PropTypes from "prop-types";
import { UsersContext } from "../../contex/UsersContex";
import Swal from "sweetalert2";

function Turno({ id, date, time, status  }) {
  const { cancelAppointment} = useContext(UsersContext)

  const handleCancel = async () => {
    try {
      
      await cancelAppointment(id)
      Swal.fire({
        icon: "warning",
        color: "red",
        title: "Turno cancelado"

      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cancelar el turno"
    })
  }
}



  return (
    <>
      <div className={styles.allContainer}>
        <div className={styles.container}>
          <h3> Turno # {id}</h3>
          <span
            className={
              status === "active" ? styles.statusActive : styles.statusInactive
            }
          >
            {status}
          </span>
        </div>

        <div>
          <p>
            Fecha: <span>{date}</span>
          </p>
          <p>
            Hora:<span> {time}</span>
          </p>
        </div>
        <button
        className={`${styles.statusInactive} ${status === "cancelled"? styles.statusActive : "" }`}
            onClick={handleCancel}
            disabled={status === "cancelled"}

        > Cancelar Turno

        </button>
      </div>
    </>
  );
}

Turno.PropTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Turno;
