const conn = require("../db");

const getCanciones = (_, res) => {
    conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.reproducciones, canciones.duracion FROM canciones JOIN albumes ON  albumes.id = canciones.album JOIN artistas ON artistas.id = albumes.artista", (err, result) => {
        res.json(result);
    });
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */
};

const getCancion = (req, res) => {
    conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.reproducciones, canciones.duracion FROM canciones JOIN albumes ON  albumes.id = canciones.album JOIN artistas ON artistas.id = albumes.artista WHERE canciones.id= ?", req.params["id"], (err,result)=>{
        res.json(result);
    });
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
};

const createCancion = (req, res) => {
    conn.query("INSERT INTO canciones (nombre, album, duracion) VALUES (?,?,?)", [req.body.nombre, req.body.album, req.body.duracion], (err,result)=>{
        if (err) res.send(err);
        res.send("Cancion creada de manera exitosa");
    })
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
};

const updateCancion = (req, res) => {
    conn.query("UPDATE canciones SET nombre = ?, album=?, duracion=? WHERE id=?", [req.body.nombre, req.body.album, req.body.duracion, req.params['id']], (err, result)=>{
        res.send("Cancion actualizada de manera exitosa");
    });
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
};

const deleteCancion = (req, res) => {
    conn.query("DELETE FROM canciones WHERE id=?", req.params['id'], (err, result)=>{       //eliminamos determinada cancion de la bdd
        res.send("Cancion eliminada de forma exitosa");
    });
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const reproducirCancion = (req, res) => {
    conn.query("UPDATE canciones SET reproducciones = reproducciones + 1 WHERE id=?", req.params['id'], (err,results)=>{    //hacemos reproducciones + 1 para asi aclarar que las reproducciones aumentan cada vez que realmente el usuario la escucha. La sentencia va a ser un UPDATE porque necesitamos modificar la actual cantidad de veces reproducidas, es necesario updetearlas.
        res.send("Cancion reproducida");
    });
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};
