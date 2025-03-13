/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext,  useState } from "react";

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


   const respuesta = await axios.post ("http://localhost:3000/users/login", userData)
   localStorage.setItem("userid", respuesta.data.user.id)
   setUser(respuesta.data.user.id)
   
  }

  const registerUser = async (userData)=> {
   await axios.post("http://localhost:3000/users/register", userData)
      
    }

    const logOutUser = () => {
      localStorage.clear()
      setUser('')
      setUserAppointments([])
    }

    const getUserAppointments = async ( userId ) => {
      const response = await axios.get(`http://localhost:3000/users/${userId}`)
      setUserAppointments(response.data.appointments)
    }

    const cancelAppointment = async (appointmentId) => {
      await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`)
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
      await axios.post(`http://localhost:3000/appointments/shedule`, appointmentValues)


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

