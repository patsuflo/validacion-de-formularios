export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML='';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML= mostrarMensajedeError(tipoDeInput,input);

    }
  }
const tipoDeErrores=[
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

  const mensajesDeerror={
    nombre: {
valueMissing:'El campo nombre no puede estar vacio',
    },
    email: {
        valueMissing:'El campo email no puede estar vacio',
        typeMismatch: 'El correo no es válido',
    },
    password: {
        valueMissing:'El campo contraseña no puede estar vacio',
patternMismatch: "Debe contener al menos una minuscula, al menos una mayuscula, al menos un numero y ningun caracter especial."
    },
    nacimiento: {
        valueMissing:'Este campo no puede estar vacio',
customError: "Debes tener al menos 18 años de edad"
    },
    telefono : {
        valueMissing:'Este campo no puede estar vacio',
        patternMismatch: 'Él formato requerido es (XXXXXXXXXX) ',
    },
    direccion : {
        valueMissing:'Este campo no puede estar vacio',
        patternMismatch:'este campo debe contener entre 10 y 40 caracteres',
    },
    ciudad : {
        valueMissing:'Este campo no puede estar vacio',
        patternMismatch:'este campo debe contener entre 4 y 30 caracteres',
    },
    estado : {
        valueMissing:'Este campo no puede estar vacio',
        patternMismatch:'este campo debe contener entre 4 y 30 caracteres',
    }
  };



  const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };

  function mostrarMensajedeError(tipoDeInput,input){
    let mensaje='';
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]){
            mensaje=mensajesDeerror[tipoDeInput][error];
        }
    })
    return mensaje;
  }
  
  function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    input.setCustomValidity(mensaje);
  }
  
  function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
  }