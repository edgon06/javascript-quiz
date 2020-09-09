const botonInicio = document.getElementById('start-button')
const contenedorPreguntas = document.getElementById('question-container')
const elementoPregunta = document.getElementById('question')
const botonesRespuesta = document.getElementById('answer-buttons')
const botonSiguiente = document.getElementById('next-button')

let preguntasDesordenadas, indicePreguntaActual

// Establecer el evento en el boton de inicio
botonInicio.addEventListener('click', iniciarJuego)
botonSiguiente.addEventListener('click', () => {
    indicePreguntaActual++
    siguientePregunta()
})

function iniciarJuego(){
    // Añadir una clase adicional al html del boton
    botonInicio.classList.add('hide')
    // Ordenar elementos en el array preguntasDesordenadas de forma aleatorea
    preguntasDesordenadas = preguntas.sort(() => Math.random() - .5) 
    indicePreguntaActual = 0
    // Eliminar una clase del div html que contiene las preguntas
    contenedorPreguntas.classList.remove('hide')
    siguientePregunta()
}

function siguientePregunta(){
    limpiar()
    mostrarPregunta(preguntasDesordenadas[indicePreguntaActual])
}

function mostrarPregunta(pregunta){
    elementoPregunta.innerText = pregunta.pregunta
    pregunta.respuestas.forEach(respuesta => {
        const boton = document.createElement('button')
        boton.innerText = respuesta.texto
        boton.classList.add('btn')
       if(respuesta.correcto)
       {
           boton.dataset.correcto = respuesta.correcto
       }
       boton.addEventListener('click', seleccionarRespuesta)
       // Añade un elemento pasado por paramentro en el interior del elemento
       botonesRespuesta.appendChild(boton) 
    });
}

function limpiar(){
    limpiarEstadoRespuesta(document.body)
    botonSiguiente.classList.add('hide')
    while(botonesRespuesta.firstChild)
    {
        // Elimina un elemento pasado por paramentro en el interior del elemento
        botonesRespuesta.removeChild(botonesRespuesta.firstChild)
    }
}

function seleccionarRespuesta(e){
    // Nota: con eventos como este parece que esta propiedad .target del objeto e representa el elemento sobre el cual se disparo el evento
    const botonSeleccionado = e.target
    const correcto = botonSeleccionado.dataset.correcto
    establecerEstadoRespuesta(document.body, correcto)
    Array.from(botonesRespuesta.children).forEach(boton => {establecerEstadoRespuesta(boton, boton.dataset.correcto)})
    if(preguntasDesordenadas.length > indicePreguntaActual + 1)
    {
        botonSiguiente.classList.remove('hide')
    }else
    {
        botonInicio.innerText = 'Reiniciar'
        botonInicio.classList.remove('hide')
    }
    
}

function establecerEstadoRespuesta(elemento, correcto){
    limpiarEstadoRespuesta(elemento)
    if(correcto)
    {
        elemento.classList.add('correcto')
    }else
    {
        elemento.classList.add('mal')
    }
}

function limpiarEstadoRespuesta(elemento)
{
    elemento.classList.remove('correcto')
    elemento.classList.remove('mal')
}

const preguntas = [
    {
        pregunta: '¿Cuánto es 2 + 2?',
        respuestas:[
            {texto: '4', correcto: true },
            {texto: '22', correcto: false }
        ]
    },
    {
        pregunta: '¿Beber agua es malo?',
        respuestas:[
            {texto: 'No', correcto: true },
            {texto: 'Sí', correcto: false },
            {texto: 'Talvez', correcto: false}
        ]
    }
]