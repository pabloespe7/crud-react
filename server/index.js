const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json()); 


const db = mysql.createConnection({
    host:"localhost",
    user:"root", //
    password:"",
    database:"empleados_crud"

});

app.post("/create",(req,res)=>{ //
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    const consulta = 'INSERT INTO empleados(nombre, edad, pais,cargo,anios) VALUES (?,?,?,?,?)';
    db.query(consulta, [nombre,edad,pais,cargo,anios], 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado registrado con éxito!!");
        }
    
    });
});

app.get("/empleados",(req,res)=>{ 
    
    db.query('SELECT * FROM empleados', 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    
    });
});

app.put("/update",(req,res)=>{ 
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    const consulta = 'UPDATE empleados SET nombre=?, edad=?, pais=?,cargo=?,anios=? WHERE id=?';
    db.query(consulta, [nombre,edad,pais,cargo,anios, id], 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado actualizado!!");
        }
    
    });
});

app.delete("/delete/:id",(req,res)=>{ 
    const id = req.params.id;
    
    const consulta = 'DELETE FROM empleados WHERE id=?';
    db.query(consulta, id, 
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    
    });
});


   

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001");
}

)