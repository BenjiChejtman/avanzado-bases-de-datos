const conn = require("../db");

const getArtistas = (_, res) => {
    conn.query("SELECT * FROM artistas", (err, result) =>{              //hacemos un SELECT porque queremos obtener ciertos datos de la tabla
        res.json(result);
    });
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
};

const getArtista = (req, res) => {
    conn.query("SELECT * FROM artistas WHERE id=?", req.params["id"], (err, result) => { //requerimos el ID
        res.json(result);
    });
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
};

const createArtista = (req, res) => {
    conn.query("INSERT INTO artistas (nombre) VALUES (?)", req.body.nombre, (err, result) => {  //como nuestro objetivo es que se cree algo en la bdd, tenemos que hacer un INSERT INTO
        res.send("Artista Creado de forma exitosa")
    });
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
};

const updateArtista = (req, res) => {
    conn.query("UPDATE artistas SET nombre=? WHERE id=?", [req.body.nombre, req.params.id], (err, result) => {      //como hay que actualizar datos, el UPDATE es lo que debemos usar
        res.send("Artista actualizado de manera exitosa");
    })
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
};

const deleteArtista = (req, res) => {
    conn.query("DELETE FROM artistas WHERE id=?", req.params["id"], (err, result) => {      //para borrar algo de la bdd debemos hacer un DELETE
        res.send("Artista borrado de manera exitosa")
    });
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const getAlbumesByArtista = (req, res) => {
    conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre as nombre_artista FROM albumes JOIN artistas ON albumes.artista = artistas.id AND artistas.id=?", req.params["id"], (err, result) => {       
        res.json(result);
    });
    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
};

const getCancionesByArtista = (req, res) => {
    conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones JOIN albumes ON canciones.album = albumes.id JOIN artistas ON albumes.artista = artistas.id AND artistas.id=?", req.params["id"], (err, result) => {
        res.json(result);
    })
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};
