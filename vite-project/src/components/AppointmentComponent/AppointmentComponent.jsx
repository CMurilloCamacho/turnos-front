import styles from "./AppointmentComponent.module.css"

const AppointmentComponent = () =>{




return (
<div 
className={styles.notAppointment}
>

  <h1 className={styles.text}>Aun no hay turnos agendados para este Usuario</h1>
</ div>
)
}



export default AppointmentComponent