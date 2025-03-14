/* eslint-disable no-const-assign */
export const formValidates = (input) => {
  const errorsObject = {};

  if (!input.name.trim()) {
    errorsObject.name = "Debes poner Nombre";
  } else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
    errorsObject.name = "El nombre solo debe contener letras y espacios";
  } else if (input.name.length < 3) {
    errorsObject.name = "El nombre debe tener al menos 3 caracteres";
  }

  if (!input.email.trim()) {
    errorsObject.email = "El email es requerido";
  } else if (
    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(input.email) === false
  ) {
    errorsObject.email = "El email debe ser un correo electrónico válido";
  }
  if (!input.birthdate) {
    errorsObject.birthdate = "La fecha de cumpleaños es requerida";
  } else {
    const birthdate = new Date(input.birthdate);
    const today = new Date();

    if (isNaN(birthdate.getTime())) {
      errorsObject.birthdate = "La fecha de cumpleaños no es válida";
    } else if (birthdate > today) {
      errorsObject.birthdate = "La fecha de cumpleaños no puede ser futura";
    } else {
      let age = today.getFullYear() - birthdate.getFullYear();
      const monthDifference = today.getMonth() - birthdate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthdate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        errorsObject.birthdate = "Debes ser mayor de 18 años";
      }

      const hundredYearsAgo = new Date(
        today.getFullYear() - 100,
        today.getMonth(),
        today.getDate()
      );
      if (birthdate < hundredYearsAgo) {
        errorsObject.birthdate =
          "La fecha de cumpleaños no puede ser mayor a 100 años";
      }
    }
  }

  if (!input.nDni.trim()) {
    errorsObject.nDni = "El DNI es requerido";
  } else if (!/^\d+$/.test(input.nDni)) {
    errorsObject.nDni = "El DNI solo debe contener números";
  } else if (input.nDni.length < 7 || input.nDni.length > 8) {
    errorsObject.nDni = "El DNI debe tener entre 7 y 8 dígitos";
  }

  if (!input.username.trim()) {
    errorsObject.username = "El nombre de usuario es requerido";
  } else if (input.username.length < 4) {
    errorsObject.username =
      "El nombre de usuario debe tener al menos 4 caracteres";
  } else if (!/^[a-zA-Z0-9_]+$/.test(input.username)) {
    errorsObject.username =
      "El nombre de usuario solo puede contener letras, números y guiones bajos";
  } else if (/\s/.test(input.username)) {
    errorsObject.username = "El nombre de usuario no puede contener espacios";
  }
  if (!input.password) {
    errorsObject.password = "La contraseña es requerida";
  } else if (input.password.length < 8) {
    errorsObject.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (
    !/[A-Za-z]/.test(input.password) ||
    !/[0-9]/.test(input.password)
  ) {
    errorsObject.password =
      "La contraseña debe contener al menos una letra y un número";
  } else if (/\s/.test(input.password)) {
    errorsObject.password = "La contraseña no puede contener espacios";
  }

  return errorsObject;
};
