/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import Turno from "../../components/Turno/Turno";
import { UsersContext } from "../../contex/UsersContex";
import AppointmentComponent from "../../components/AppointmentComponent/AppointmentComponent";

function Misturnos() {
  const {getUserAppointments, user, userAppointments} = useContext(UsersContext)

  useEffect(()=>{
    getUserAppointments(user)

  }, [])



  return (
    <div>
      <div>
        <h1>Mis Turnos</h1>
      </div>

      <div>
        {userAppointments.length > 0 ? (
          userAppointments.map((turno) => (
            <Turno
              key={turno.id}
              id={turno.id}
              date={turno.date}
              time={turno.time}
              status={turno.status}
            />
          ))
        ) : (
          <AppointmentComponent/>
        )}
      </div>
    </div>
    


  );
}

export default Misturnos;
