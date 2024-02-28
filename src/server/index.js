const express = require("express")
const mysql = require("mysql")
const app = express()
const cors = require("cors")
const port = 4000
const fs = require('fs');
const multer = require('multer');
const path = require('path')







app.use(cors())
app.use(express.json());



// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  path.join(__dirname, './uploads')); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilizar el nombre original del archivo
}
});

const upload = multer({ storage: storage });





app.listen(port, () => {
    console.log("Servidor de AlquileGente Conectado")
})

app.get("/", (req, res) => {
    res.send("Servidor en linea ")
})



// PARTE 1 CRUD DE RESEÑAS



// GENERAR CONECCION

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'spizamarillo2715',
    database: 'BDAlquileGente',
    charset: 'utf8mb4'
})

connection.connect((error) => {
    if (error) {
      console.error('Error al conectar a la base de datos:', error);
      return;
    }
    console.log('Conexión exitosa a la base de datos');
  });

  
// PARTE 1 ENVIO DE RESEÑAS


  app.post('/enviarResenas', (req, res) => {
    // Obtener las reseñas del cuerpo de la solicitud
    const { nombre, resena } = req.body;
  
    // Insertar los datos en la tabla "Reseñas"
    const sql = 'INSERT INTO Resenas (nombre, resena) VALUES (?, ?)';
    connection.query(sql, [nombre, resena], (error, resultados) => {
      if (error) {
        console.error('Error al insertar reseña en la base de datos:', error);
        res.status(500).send('Error al insertar reseña en la base de datos');
        return;
      }
      console.log('Reseña insertada correctamente en la base de datos');
      res.status(200).send('Reseña insertada correctamente en la base de datos');
    });
  });
  
  // Cerrar la conexión a la base de datos cuando la aplicación se cierre
  process.on('exit', () => {
    connection.end();
    console.log('Conexión a la base de datos cerrada');
  });

// MANDAR RESEÑAS AL FRONTEND 

  app.get('/traerResenas', (req, res) => {
    const sql = "SELECT * FROM Resenas";
  
    // Ejecutar la consulta SQL
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener las reseñas' });
        return;
      }
      res.json(results); // Enviar los resultados como respuesta en formato JSON
    });
  });



  // Insertar los datos en la tabla Servicios

  app.post('/enviarServicio', (req, res) => {
     const { nombrePersona, ubicacion, tipoAcompaniamiento, descripcion, precio, diasDisponibles, horasPreferidas, horasDiarias, whatssap } = req.body
     const sql = 'INSERT INTO Servicios (nombrePersona, ubicacion, tipoAcompaniamiento, descripcion, precio, diasDisponibles, horasPreferidas, horasDiarias, whatssap) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
     connection.query(sql, [nombrePersona, ubicacion, tipoAcompaniamiento, descripcion, precio, diasDisponibles, horasPreferidas, horasDiarias, whatssap], (error, resultados) => {
      if (error) {
        console.error('Error al insertar servicio en la base de datos:', error);
        res.status(500).send('Error al insertar servicio en la base de datos');
        return;
      }
      console.log('Servicio insertado correctamente en la base de datos');
      res.status(200).send('Servicio insertado correctamente en la base de datos');
    });
  // Cerrar la conexión a la base de datos cuando la aplicación se cierre
  process.on('exit', () => {
    connection.end();
    console.log('Conexión a la base de datos cerrada');
  });


  });
  


  // MANDAR SERVICIOS AL FRONTEND

  app.get("/traerServicios", (req, res) => {
const sql = "SELECT * FROM Servicios;"
connection.query(sql, (err, results) => {
  if (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ error: 'Error al obtener los servicios' });
    return;
  }
  res.json(results); // Enviar los resultados como respuesta en formato JSON
});
});


  

// Insertar los datos en la tabla de Solicitudes


app.post('/enviarSolicitud', (req, res) => {
  const { nombrePersona, ubicacion, tipoAcompaniamiento, descripcion, precio, diasDisponibles, horasPreferidas, horasDiarias, whatssap } = req.body
  const sql = 'INSERT INTO Solicitudes (nombrePersona, ubicacion, tipoAcompaniamiento, descripcion, precio, diasDisponibles, horasPreferidas, horasDiarias, whatssap) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nombrePersona, ubicacion, tipoAcompaniamiento, descripcion, precio, diasDisponibles, horasPreferidas, horasDiarias, whatssap], (error, resultados) => {
   if (error) {
     console.error('Error al insertar solicitud en la base de datos:', error);
     res.status(500).send('Error al insertar solicitud en la base de datos');
     return;
   }
   console.log('Solicitud insertada correctamente en la base de datos');
   res.status(200).send('Solicitud insertada correctamente en la base de datos');
 });
// Cerrar la conexión a la base de datos cuando la aplicación se cierre
process.on('exit', () => {
 connection.end();
 console.log('Conexión a la base de datos cerrada');
});


});



  // MANDAR SOLICITUDES AL FRONTEND

  app.get("/traerSolicitudes", (req, res) => {
    const sql = "SELECT * FROM Solicitudes;"
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener las solicitudes' });
        return;
      }
      res.json(results); // Enviar los resultados como respuesta en formato JSON
    });
    });
    
    
    

  //   fullname: "",
  //   email: "",
  //   phone: "",
  //   city: "",
  //   iban: "",
  //   password: "",
  //   confirm_password: "",
  //   civilStatus: "",
  //   searchInteres: "",
  //   personalInteres: "",
  //   whoDoYouLive: "",
  //   musicalTaste: "",
  //   favoriteActivity: "",
  //   alcoholimetro: "",
  //   secretAsk: '',
  // secretAnswer: ''


  // Insertar los datos en la tabla de Solicitudes


  app.post('/enviarUsuario', (req, res) => {
    const { payMethod, fullname, email, phone, city, iban, password, confirm_password, civilStatus, searchInteres, personalInteres, whoDoYouLive, musicalTaste, favoriteActivity, alcoholimetro, secretAsk, secretAnswer } = req.body;
    
    const sql = 'INSERT INTO usuarios (payMethod, fullname, email, phone, city, iban, password, confirm_password, civilStatus, searchInteres, personalInteres, whoDoYouLive, musicalTaste, favoriteActivity, alcoholimetro, secretAsk, secretAnswer, resenas, solicitudes, servicios) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    const values = [payMethod, fullname, email, phone, city, iban, password, confirm_password, civilStatus, searchInteres, personalInteres, whoDoYouLive, musicalTaste, favoriteActivity, alcoholimetro, secretAsk, secretAnswer, 0, 0, 0];
    
    connection.query(sql, values, (error, resultados) => {
        if (error) {
            console.error('Error al insertar usuario en la base de datos:', error);
            res.status(500).send('Error al insertar usuario en la base de datos');
            return;
        }
        console.log('Usuario insertado correctamente en la base de datos');
        res.status(200).send('Usuario insertado correctamente en la base de datos');
    });
  });
  
  // Cerrar la conexión a la base de datos cuando la aplicación se cierre
  process.on('exit', () => {
    connection.end();
    console.log('Conexión a la base de datos cerrada');
  });



  // MANDAR USUARIOS AL FRONTEND

  
  app.get("/traerUsuarios", (req, res) => {
    const sql = "SELECT * FROM usuarios;"
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
        return;
      }
      res.json(results); // Enviar los resultados como respuesta en formato JSON
    });
    });


    app.post("/enviarImagen", upload.single('imagen'), (req, res) => {
      if (!req.file) {
        return res.status(400).send('No se proporcionó ninguna imagen');
      }
    
      const fileName = req.file.originalname; // Obtener el nombre original del archivo
    
      const sql = "UPDATE Usuarios SET imagen = ? LIMIT 1";
      const values = [fileName]; // Usar el nombre original del archivo
      
      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error('Error al insertar imagen en la base de datos:', error);
          res.status(500).send('Error al insertar imagen en la base de datos');
          return;
        }
        console.log('Nombre del archivo insertado correctamente en la base de datos:', fileName);
        res.status(200).json({ fileName }); // Enviar el nombre del archivo como parte de un objeto JSON en la respuesta
      });
    });



    // Endpoint para obtener la foto de perfil de un usuario
app.get("/imagenUsuario/:userId", (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT imagen FROM Usuarios WHERE id = ?";
  
  connection.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error al obtener la imagen del usuario:', error);
      res.status(500).send('Error al obtener la imagen del usuario');
      return;
    }
    
    if (results.length === 0 || !results[0].imagen) {
      res.status(404).send('Imagen no encontrada para el usuario especificado');
      return;
    }
    
    // Devuelve la imagen como una respuesta de tipo imagen
    res.writeHead(200, {'Content-Type': 'image/jpeg'}); // Ajusta el tipo de contenido según el formato de la imagen almacenada
    res.end(results[0].imagen);
  });
});