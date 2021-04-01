//Todo lo relacionado a las rutas
import express from 'express';
import {paginaInicio, paginaNosotros, paginaTestimonios, paginaViajes,paginaDetalleViaje} from '../controllers/paginasController.js';
import  {guardarTestimonio} from '../controllers/testimoniosController.js';
const router= express.Router();

router.get('/', paginaInicio); //El render va en el controlador, porque estamos usando MVC

router.get('/nosotros', paginaNosotros);

router.get('/testimonios', paginaTestimonios);
router.post('/testimonios', guardarTestimonio);

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje);

export default router;