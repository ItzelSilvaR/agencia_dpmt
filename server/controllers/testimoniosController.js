import {Testimonio} from '../models/Testimonios.js';

const guardarTestimonio = async (req,res)=>{
    //Validar formulario
    const {nombre,correo,mensaje}= req.body;
    const errores=[];
    if(nombre.trim()===''){
        errores.push({mensaje:'Nombre vacío'});
    }
    if(correo.trim()===''){
        errores.push({mensaje:'Correo vacío'});
    }
    if(mensaje.trim()===''){
        errores.push({mensaje:'Mensaje vacío'});
    }

    if(errores.length>0){

        //consultar testimonios existentes
        const testimonios= await Testimonio.findAll();
        //Mostrar vista
        res.render('testimonios',{
            pagina: 'Testimonios',
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        });
    } else{
        //almacenar en bd
        try {
            await Testimonio.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimonios');
        } catch (error) {
            console.log(error);
        }
    }
}

export {guardarTestimonio};