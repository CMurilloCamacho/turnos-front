/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext,  useState } from "react";

const URL = "https://turnos-ak0h.onrender.com"

// eslint-disable-next-line react-refresh/only-export-components
export const UsersContext = createContext({
  user: "",
  userAppointments: [],
  loginUser: async () => {},
  registerUser: async () => {},
  logOutUser: () => {},
  getUserAppointments: async () => {},
  cancelAppointment: async () => {},
  createAppointment: async () => {}
});

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("userid") || "")
  const [userAppointments , setUserAppointments ] = useState([])

  const loginUser =  async (userData) => {


   const respuesta = await axios.post (`${URL}/users/login`, userData)
   localStorage.setItem("userid", respuesta.data.user.id)
   setUser(respuesta.data.user.id)
   
  }

  const registerUser = async (userData)=> {
   await axios.post(`${URL}/users/register`, userData)
      
    }

    const logOutUser = () => {
      localStorage.clear()
      setUser('')
      setUserAppointments([])
    }

    const getUserAppointments = async ( userId ) => {
      const response = await axios.get(`${URL}/users/${userId}`)
      setUserAppointments(response.data.appointments)
    }

    const cancelAppointment = async (appointmentId) => {
      await axios.put(`${URL}/appointments/cancel/${appointmentId}`)
      const userAppointmentsUpdate = userAppointments.map (appointment => {
        if(appointment.id === appointmentId){
          const appointmentUpdate = {...appointment, status : "cancelled"}
          return appointmentUpdate
        }else return appointment
      } )
      return setUserAppointments(userAppointmentsUpdate)
    }

    const createAppointment =async (values)=>{

      const appointmentValues = {
        ...values,
        userId: user
      }
      await axios.post(`${URL}/appointments/shedule`, appointmentValues)


    }
  

  const value = {
    user,
    userAppointments,
    loginUser,
    registerUser,
    logOutUser,
    getUserAppointments,
    cancelAppointment,
    createAppointment
  }


  return ( 
  <UsersContext.Provider value={value}>
    {children}
  </UsersContext.Provider>
  ); 
  
}

