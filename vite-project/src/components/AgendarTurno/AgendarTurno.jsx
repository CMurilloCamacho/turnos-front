import { useFormik } from "formik";
import { dateFormValidates } from "../../helpers/dateformValidates";
import styles from "./AgendarTurno.module.css";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsersContext } from "../../contex/UsersContex";
const AgendarTurno = () => {

  const { createAppointment} = useContext(UsersContext)

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    validate: dateFormValidates,
    initialErrors: {
      date: "La fecha es obligatoria",
      time: "La hora es obligatoria",
    },
    onSubmit: async (values) => {
      try {
        await createAppointment(values)
        Swal.fire({
          icon: 'success',
          title: "Turno agendado con éxito"
        })
        
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `${error.response.data.details}`,
          text: "Intente nuevamente"
        })
      } finally{
        formik.resetForm
      }

    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Agendar Turno</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formGroup}>
          <label> Fecha </label>
          <input
            id="date"
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={formik.handleChange}
            value={formik.values.date}
            className={
              formik.touched.date && formik.errors.date
                ? styles.errorInput
                : styles.input
            }
          />
          {formik.errors.date ? (
            <>
              <div className={styles.error}> {formik.errors.date} </div>
            </>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="time">Hora</label>
          <input
            id="time"
            name="time"
            type="time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
            className={
              formik.touched.time && formik.errors.time
                ? styles.errorInput
                : styles.input
            }
          />
          {formik.errors.time ? (
            <div className={styles.error}>{formik.errors.time}</div>
          ) : null}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={Object.keys(formik.errors).length > 0}
          >
            Agendar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgendarTurno;
