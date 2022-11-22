// const conexion = require('./database/db');

const express = require('express');
const router = express.Router();

//ruta para el index
router.get('/',(req,res)=>{
    if(req.session.loggedin == true) {
        res.render('index', {name: req.session.name});
    } else {
        res.redirect('/login');
    }
});

//ruta para mostrar datos de productos en la pantalla de registrar ventas
router.get('/registrar',(req,res)=>{
    req.getConnection((err, conn) => {
        conn.query('select * from producto',(error,results)=>{
            if(error){
                throw error;
            }else{
                res.render('registrar_venta',{results:results});
            }
        });
    });
});

/* -----------------Productos--------------------- */
//ruta para mostrar datos de productos
router.get('/productos',(req,res)=>{
    req.getConnection((err, conn) => {
        conn.query('select * from producto',(error,results)=>{
            if(error){
                throw error;
            }else{
                res.render('productos',{results:results});
            }
        });
    });
});

//ruta para nuevos productos
router.get('/productoNuevo',(req,res)=>{
    res.render('productoNuevo');
});

//ruta para editar productos
router.get('/productoedit/:id',(req,res)=>{
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('select * from producto where id_prod = ?',[id],(error,results)=>{
            if(error){
                throw error;
            }else{
                res.render('productoedit',{user:results[0]});
            }
        });
    });
});

//ruta para eliminar productos
router.get('/productodelete/:id',(req,res)=>{
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('delete from producto where id_prod = ?',[id],(error, results)=>{
            if(error){
                throw error;
            }else{
                res.redirect('/productos');
            }
        });
    });
});

//Registrar ventas
router.get('/registrar',(req,res)=>{
    req.getConnection((err, conn) => {
        conn.query('select * from boleta',(error,results)=>{
            if(error){
                throw error;
            }else{
                res.render('registrar_venta',{results:results});
            }
        });
    });
});

/* ----------------- AdmiVenta --------------------- */
//ruta para mostrar datos de ventas y producto
router.get('/adminVenta',(req,res)=>{
    req.getConnection((err, conn) => {
        conn.query('SELECT p.id_prod, p.producto, p.precio, b.id_boleta, b.fecha, b.total_pagar, det.id_boleta, det.cantidad,c.dni, c.nombre FROM detalle_boleta AS det INNER JOIN producto AS p ON p.id_prod=det.id_prod INNER JOIN boleta AS b ON b.id_boleta=det.id_boleta INNER JOIN cliente AS c ON b.dni=c.dni',(error,results)=>{
            if(error){
                throw error;
            }else{
                res.render('adminVenta',{results:results});
            }
        });
    });
});

//ruta para nuevos usuarios
const crud = require('./controllers/crud');
// router.post('/addusuario',crud.addusuario);
//ruta para editar empleados

// router.post('/login',crud.login);


//------------------------------------------------------
//ruta para nuevos productos
router.post('/addproducto',crud.addproducto);
//ruta para actualizar empleados
router.post('/updateproducto',crud.updateproducto);

module.exports = router;