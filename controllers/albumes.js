const conn = require("../db");

const getAlbumes = (_, res) => {
    conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON albumes.artista=artistas.id", (err,result)=>{
        res.json(result);
    });
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
};

const getAlbum = (req, res) => {
    conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON artistas.id = albumes.artista AND albumes.id=?", [req.params['id']], (err, result)=>{
        res.json(result);
    });
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */
};

const createAlbum = (req, res) => {
    conn.query("INSERT INTO albumes(nombre, artista) values (?,?)", [req.body.nombre, req.body.artista], (err,result)=>{
        res.send("Album creado de manera exitosa");
    });
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const updateAlbum = (req, res) => {
    conn.query("UPDATE albumes SET nombre = ?, artista = ? WHERE id=?", [req.body.nombre, req.body.artista, req.params['id']], (err,result)=>{
        res.send("Album actualizado");
    });
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const deleteAlbum = (req, res) => {
    conn.query("DELETE FROM albumes WHERE id=?", req.params['id'], (err,result)=>{
        res.send("Album eliminado");
    });
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const getCancionesByAlbum = (req, res) => {
    const albumID = req.params.id;
    conn.query("SELECT canciones.id, canciones.nombre, albumes.nombre AS nombre_album, artistas.nombre AS nombre_artista, canciones.duracion, canciones.reproducciones FROM artistas JOIN albumes ON albumes.artista = artistas.id JOIN canciones ON canciones.album = albumes.id WHERE albumes.id = '"+ albumID +"'", (err, result)=>{
        res.send(result);
    });
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};
