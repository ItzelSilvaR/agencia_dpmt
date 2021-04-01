import {Viaje} from '../models/Viaje.js';
import {Testimonio} from '../models/Testimonios.js';

const paginaInicio= async (req, res)=>{ //req lo que envias, res lo que express te envía
    //Consultar tres viajes del modelo viaje
    const promiseDB= [];
    promiseDB.push(Viaje.findAll({
        limit: 3}));
    promiseDB.push(Testimonio.findAll({
        limit: 3
    }));

    try {
        const resultado = await Promise.all(promiseDB); //Arrancar ambas consultas al mismo tiempo

        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
        });
    } catch (error) {
        console.log('Error: '+ error);
    }
};

const paginaNosotros= (req, res)=>{
    res.render('nosotros', { //Pasarle variables, se pasan en un objeto
        pagina: 'Nosotros'
    });
};

const paginaTestimonios= async (req, res)=>{
    try {
        const testimonios= await Testimonio.findAll();
        res.render('testimonios', { 
        pagina: 'Testimonios',
        testimonios
    });   
    } catch (error) {
        console.log('error');
    }
};

const paginaViajes=  async (req, res)=>{
    const viajes= await Viaje.findAll();
    //console.log(viajes);
    res.render('viajes', { 
        pagina: 'Próximos viajes',
        viajes
    });
};

//Mustra un viaje por su slug
const paginaDetalleViaje= async (req, res)=>{
    const {slug}= req.params;
    try {
        const resultado= await Viaje.findOne({where: {slug}});
        res.render('viaje',{
            pagina: 'Información viaje',
            viaje: resultado
        })
    } catch (error) {
        console.log(error);
    }
};


export {
    paginaInicio,
    paginaNosotros,
    paginaTestimonios,
    paginaViajes,
    paginaDetalleViaje
}