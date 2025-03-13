const isValidTime =(time) => {
 const [hour, minute] = time.split(":").map(Number)
const totalMinutes = hour*60 + minute
const startTime = 8*60
const endTime = 16*60

return totalMinutes >= startTime && totalMinutes <= endTime 
}


export const dateFormValidates = (inputs) => {


  const errors = {}
  const {date, time} = inputs
  const selectDateTime = new Date(`${date}T${time}`)

  const now = new Date()
  const twentyFourOursLater = new Date(now.getTime() + 24 * 60 * 60 *1000)

  

  if(!date){
    errors.date = "Es obligatorio poner fecha"
  }else if(selectDateTime < now){
    errors.date = "No se pueden seleccionar fechas pasadas"
  }else if (selectDateTime< twentyFourOursLater){
    errors.date = "No se pueden agendar citas con menos de 24 horas de anticipacion"
  } else if (selectDateTime.getDay() === 0 || selectDateTime.getDay()=== 6){
    errors.date = "No se pueden agendar citas los fines de semana"
  }


  if(!time){
    errors.time = "La hora es obligatorio"
  }else if (!isValidTime(time)){
    errors.time = "Los horarios de atención son de 8 Am hasta las  4 Pm"
  }

  return errors
}