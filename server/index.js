import express from 'express'; //habiltar TYPE en package.json
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({path:"variables.env"});

//const express = require('express'); //common JS
const app= express();

/**
 * Conectar a la base de datos.
 * Base de datos mysql
 */
db.authenticate().then(
    ()=>console.log('Base de datos conectada')
).catch(
    (error)=>console.log(error)
);

//Definir puerto
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

//Habilitar pug-- Template engine
app.set('view engine', 'pug');

//Creal middleware
//Obtener el año actual
app.use((req, res, next)=>{ //para el siguiente middleware
    const year = new Date();
    res.locals.actualYear= year.getFullYear(); //Para compartir una variable en las vistas 
    res.locals.nombresitio= "Agencia de viajes";
    next(); //SI no lo hace, se fuerza con return
});

//Agregar body parser para leer los datos que ingresan en la página
app.use(express.urlencoded({extended:true}));


//Definir la carpeta pública (Aquí están las imágenes y estilos)
app.use(express.static('public'));

//Agregar router
app.use('/',router); //Como manejador de ruta

app.listen(port, host ,()=>{
    console.log(`EL servidor esta funcionando en el puerto ${port}`);
});



/**
 * APUNTES DE MVC que después pasaré
 * 
 * Modelo:Encargado de los datos (desde una base de datos) y de la lógica para mostrar esos datos.
 * Vista: Encaragado de lo que se ve en pantalla (en este caso el HTML), muestra los resultados.
 * Controlador: ENcargado de la comunicación entre el modelo y la vista.Llama y pasa datos.
 * 
 * Router: Es el encargado de registrar todas las URL'S o EndPoints que la aplicación soporta.
 */