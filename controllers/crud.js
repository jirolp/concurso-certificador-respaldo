// const conexion = require('../database/db');
// exports.addusuario = (req,res)=>{
//     const nom = req.body.nom;
//     const ape = req.body.ape;
//     let car = req.body.car;
//     const user = req.body.user;
//     const pass = req.body.pass;
//     /*const id_car = String(conexion.query('select id_cargo from cargo where cargo.nombre = ?', {nombre:car},(error)=>{
//         if(error){
//             console.log(error);
//         }else{
//             res.redirect('/registro');
//         }
//     }));*/ 
//     if(car == "Vendedor"){
//         car = "001";
//     }else{
//         car = "002";
//     }

//     conexion.query('insert into usuarios set ?',{nombre:nom,
//     apellido:ape,id_cargo:car,username:user,password:pass},(error)=>{
//         if(error){
//             console.log(error);
//         }else{
//             res.redirect('/registro');
//         }
//     });
// }


exports.updatealumnos = (req,res) =>{
    const cod = req.body.cod;
    const ape = req.body.ape;
    const nom = req.body.nom;
    const dir = req.body.dir;
    const telef = req.body.telef;
    const cod_carrera = req.body.cod_carrera;
    req.getConnection((err, conn) => {
        conn.query('update alumnos set ? where IdAutor = ?',[{IdAutor:cod,
            Apellidos:ape,Nombres:nom,Direccion:dir,Telefono:telef,IdCarrera:cod_carrera},cod],(error)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/mr_alumnos');
            }
        });
    });
}
//----------------------------------------------------
exports.addproducto = (req,res)=>{
    const cod = req.body.cod;
    const nom = req.body.nom;
    const pre = req.body.pre;
    const stock = req.body.stock;
    req.getConnection((err, conn) => {
        conn.query('insert into producto set ?',{id_prod:cod,producto:nom,precio:pre,stock:stock},(error)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/productos');
            }
        });
    });
}
exports.updateproducto = (req,res)=>{
    const cod = req.body.cod;
    const nom = req.body.nom;
    const pre = req.body.pre;
    const stock = req.body.stock;
    req.getConnection((err, conn) => {
        conn.query('update producto set ? where id_prod = ?',[{id_prod:cod,producto:nom,precio:pre,stock:stock},cod],(error)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/productos');
            }
        });  
    });  
}
    
