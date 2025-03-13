export const loginFormValidate = (input) => {
  const errorsObject = {};



  if (!input.username.trim()) {
    errorsObject.username = "El nombre de usuario es requerido";
  } else if (input.username.length < 4) {
    errorsObject.username = "El nombre de usuario debe tener al menos 4 caracteres";
  } else if (!/^[a-zA-Z0-9_]+$/.test(input.username)) {
    errorsObject.username = "El nombre de usuario solo puede contener letras, números y guiones bajos";
  } else if (/\s/.test(input.username)) {
    errorsObject.username = "El nombre de usuario no puede contener espacios";
  }
  if (!input.password) {
    errorsObject.password = "La contraseña es requerida";
  } else if (input.password.length < 8) {
    errorsObject.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Za-z]/.test(input.password) || !/[0-9]/.test(input.password)) {
    errorsObject.password = "La contraseña debe contener al menos una letra y un número";
  } else if (/\s/.test(input.password)) {
    errorsObject.password = "La contraseña no puede contener espacios";
  }


  return errorsObject;
};
