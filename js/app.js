// CAMPOS DEL FORMULARIO
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');



// CLASES
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
}

class UI{
    imprimirAlerta(mensaje, tipo) {
        // Crear el Div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase en base al tipo de error
        if(tipo ==='error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');

        }
        // Mnesaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Eliminar despúes de 3 segundos

        setTimeout( () => {
            divMensaje.remove();
        }, 3000)
    }

    imprimirCitas({citas}) {
        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas , id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder"> Propietario: </span> ${propietario} 
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder"> Telefono: </span> ${telefono} 
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder"> Fecha: </span> ${fecha} 
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder"> Hora: </span> ${hora} 
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder"> Sintomas: </span> ${sintomas} 
            `;

            // Botón para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> </svg>';

            btnEliminar.onclick = () => eliminarCita(id)


            // Agregar los parrafos al div cita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);


            // Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild( contenedorCitas.firstChild )
        }
    }
}


// INSTANCIANDO CLASES
const administrarCitas = new Citas();
const ui = new UI();



// REGISTRAR EVENTOS
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// OBJETO PARA LA INFORMACIÓN DE LA CITA
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
    id: ''
}



// AGREGAR DATOS AL OBJETO DE CITA
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(puta) {
    puta.preventDefault();

// Extraer (destructuring) la información del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

// Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    } if (!/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(propietario)) {
        ui.imprimirAlerta('El nombre del propietario solo debe incluir letras', 'error');
        return;
    } if ( telefono.length < 10 || telefono.length > 10 || !/^[0-9]*$/.test(telefono) ) {
        ui.imprimirAlerta('El teléfono debe ser a 10 dígitos y solo debe contener números', 'error');
        return;
    }

    // generar un id único
    citaObj.id = Date.now();

    // Creando una nueva cita
    ui.imprimirAlerta('Cita agendada con éxito', 'success');
    administrarCitas.agregarCita({...citaObj});

    // Reinicia el formulario
    formulario.reset();

    // Reiniciar el objeto del formulario
    reiniciarObjeto();

    // Mostrar HTML de las citas
    ui.imprimirCitas(administrarCitas);


}

// REINICIA EL OBJETO
function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

function eliminarCita(id) {
    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    // Muestra un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente', 'success');

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}