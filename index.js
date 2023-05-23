'use strict';
/*
 * GELBERG, JAVIER | DWN2CV
 */

//poner los discos todos los discos:
let aLaDisco = [];

//Array que va a guardar cada codigo numerico unico de disco
let aCNum = [];

//Constante de comprobacion
const __Cod = -1;


function NuevoDisco() {
    // Propiedades privadas de la funcion constructora:
    let
        elepe = false,
        cancion,
        time,

        //Array que va a guardar cada disco con sus datos
        acumuladoDisco = [];

    //Array que va a guardar los datos de las pistas
    acumuladoDisco['Pistas'] = [];


    // Métodos públicos de la funcion constructura:
    this.NombreDisco = function () {
        do {
            if (elepe) {
                alert(`Ingrese un nombre valido para el disco`);
            }
            this.nombreDisco = prompt(`Coloque un nombre para el disco`);
            elepe = true;
        } while (!isNaN(this.nombreDisco));
        elepe = false;
    }

    this.NombreBanda = function () {
        do {
            if (elepe) {
                alert(`Ingrese un nombre valido para la banda o autor`);
            }
            this.banda = prompt(`Ingrese el nombre del autor o la banda`);
            elepe = true;
        } while (!isNaN(this.banda));
        elepe = false;
    }

    this.CodigoNumerico = function () {
        do {
            this.codigoNum = parseInt(prompt(`Ingrese un codigo numerico para el disco`, `Rango: 1 a 999`));

            if (aCNum.indexOf(this.codigoNum) != __Cod) {
                this.codigoNum = __Cod;
                alert(`El codigo es invalido, ya fue utilizado. Por favor ingrese un nuevo codigo.`)
            } else {
                this.codigoNum
            }
        } while (!(this.codigoNum >= 1 && this.codigoNum <= 999));
        aCNum.push(this.codigoNum);
    }

    this.NombreCancion = function () {
        do {
            if (elepe) {
                alert(`Ingrese un nombre valido para la pista`);
            }
            cancion = prompt(`Ingrese el nombre de la pista`);
            elepe = true;
        } while (!isNaN(cancion));
        elepe = false;
    }

    this.timeCancion = function () {
        do {
            if (elepe) {
                alert(`El time no es valido, Ingrese otro`);
            }
            time = parseInt(prompt(`Ingrese el time de la cancion`, `Max: 7200 segundos`));
            elepe = true;
        } while (!(time >= 1 && time <= 7200));
        elepe = false;
    }


    //Introduccion del disco a la discoteca ;)
    this.DatosDisco = function () {
        acumuladoDisco['Nombre'] = this.nombreDisco;
        acumuladoDisco['Banda'] = this.banda;
        acumuladoDisco['Codigo Numerico'] = this.codigoNum;
    }
    //aca van las pistas
    this.DatosPistas = function () {
        let datos_canciones = {
            'Nombre de la pista': cancion,
            'time de la pista': time,
        }
        acumuladoDisco['Pistas'].push(datos_canciones);
    }

    this.GuardarDatosDisco = function () {
        aLaDisco.push(acumuladoDisco);
    }
}

// Funcion constructora para cargar discos:
function CargarDisco() {
    let disco = 0;

    do {
        disco = new NuevoDisco();
        disco.NombreDisco();
        disco.NombreBanda();
        disco.CodigoNumerico();
        disco.DatosDisco();
        disco.GuardarDatosDisco();
        do {
            disco.NombreCancion();
            disco.timeCancion();
            disco.DatosPistas();
        } while (confirm('Desea agregar otra pista?'))
    } while (confirm('Desea agregar otro disco?'))
}

// Mostrar discos
function MostrarDisco() {
    let web = '';
    let i = 0;
    let tiempototal = 0;
    let tiempodisco = 0;
    let tdI = 0;


    for (let numDisc in aLaDisco) {
        i = numDisc;
        web += `<h2> ${aLaDisco[i]['Nombre']}</h2>`;
        web += '<ul>'
        web += `<li class="listas"> Nombre Disco : ${aLaDisco[i]['Nombre']}</li>`
        web += `<li class="listas"> Banda o Autor : ${aLaDisco[i]['Banda']}</li>`
        web += `<li class="listas"> Codigo Numerico : ${aLaDisco[i]['Codigo Numerico']}</li>`


        for (let infopistas in aLaDisco[i]['Pistas']) {

            tdI = infopistas;
            for (let dataobjeto in aLaDisco[i]['Pistas'][infopistas]) {
                web += //marca en rojo si supera los 180 segundos
                    `<li class="listas" >${dataobjeto} : ${aLaDisco[i]['Pistas'][infopistas][dataobjeto] >= 180 ?
                        `<li style="background-color: red; color: white; width: 50%; text-align:center; list-style:none;"> ${aLaDisco[i]['Pistas'][infopistas][dataobjeto]}` :
                        `<li class="listas"> ${aLaDisco[i]['Pistas'][infopistas][dataobjeto]} `} </li>`
            }
            tiempodisco += aLaDisco[i]['Pistas'][tdI]['time de la pista']
            tiempototal += aLaDisco[i]['Pistas'][infopistas]['time de la pista']

        }


        web += `<p class="parrafo" style="margin-top: 20px">Promedio de time de cada pista: ${tiempodisco / aLaDisco[i]['Pistas'].length} segundos</p><br/>`
        web += `<p class="parrafo">Cantidad de pistas que tiene el disco: ${aLaDisco[i]['Pistas'].length}</p><br/>`
        web += `<p class="parrafo">Time total que tiene el disco: ${tiempodisco} segundos</p><br/>`
        tiempodisco = 0;
    }
    web += '</ul>'


    if (aLaDisco.length == 0) {
        alert(`No se ha cargado ningun disco al sistema`);
    } else {
        web += `<p class="parrafo2">Cantidad de discos cargados: ${aLaDisco.length}</p>`
        web += `<p class="parrafo2">Tiempo total de las pistas de los discos:  ${tiempototal} segundos</p><br /><br />`
    }


    document.getElementById('info').innerHTML = web;

   
}

function LimpiarDisco() {
    document.getElementById('info').innerHTML = '';
}

